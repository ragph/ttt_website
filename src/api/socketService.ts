import { io, Socket } from "socket.io-client";

// Get the socket URL from the API base URL (without /api suffix)
const getSocketUrl = () => {
  const baseUrl =
    import.meta.env.VITE_API_BASE_URL ||
    "https://api.earningwhiletravelling.com/api";
  return baseUrl.replace(/\/api$/, "");
};

class SocketService {
  private socket: Socket | null = null;
  private surveyId: number | null = null;

  connect(surveyId: number): Socket {
    // If already connected with the same surveyId, return existing socket
    if (this.socket?.connected && this.surveyId === surveyId) {
      return this.socket;
    }

    // Disconnect existing socket if connecting with different surveyId
    if (this.socket) {
      this.disconnect();
    }

    this.surveyId = surveyId;

    const socketUrl = getSocketUrl();
    console.log("🔌 Connecting to socket server:", socketUrl);

    this.socket = io(socketUrl, {
      transports: ["websocket", "polling"],
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
    });

    this.socket.on("connect", () => {
      console.log("✅ Socket connected:", this.socket?.id);
      // Join the casting room for real-time updates
      this.joinCastingRoom(surveyId);
    });

    this.socket.on("disconnect", (reason: string) => {
      console.log("❌ Socket disconnected:", reason);
    });

    this.socket.on("connect_error", (error: Error) => {
      console.error("🔴 Socket connection error:", error.message);
    });

    this.socket.on("reconnect", (attemptNumber: number) => {
      console.log("🔄 Socket reconnected after", attemptNumber, "attempts");
      // Rejoin the casting room after reconnection
      if (this.surveyId) {
        this.joinCastingRoom(this.surveyId);
      }
    });

    return this.socket;
  }

  private joinCastingRoom(surveyId: number) {
    if (this.socket?.connected) {
      console.log("📊 Joining casting room for survey:", surveyId);
      this.socket.emit("join-casting", surveyId);
    }
  }

  onCastingUpdate(callback: (data: any) => void): void {
    if (this.socket) {
      // Remove existing listener to avoid duplicates
      this.socket.off("casting-update");
      this.socket.on("casting-update", (data) => {
        console.log("📥 Received casting update:", data);
        callback(data);
      });
    }
  }

  // Keep legacy methods for backward compatibility
  onVoteUpdate(callback: (data: any) => void): void {
    this.onCastingUpdate(callback);
  }

  onSurveyResults(callback: (data: any) => void): void {
    this.onCastingUpdate(callback);
  }

  leaveCastingRoom(): void {
    if (this.socket?.connected && this.surveyId) {
      console.log("📊 Leaving casting room for survey:", this.surveyId);
      this.socket.emit("leave-casting", this.surveyId);
    }
  }

  disconnect(): void {
    if (this.socket) {
      console.log("🔌 Disconnecting socket");
      this.leaveCastingRoom();
      this.socket.disconnect();
      this.socket = null;
      this.surveyId = null;
    }
  }

  isConnected(): boolean {
    return this.socket?.connected || false;
  }

  getSocket(): Socket | null {
    return this.socket;
  }
}

// Export singleton instance
export const socketService = new SocketService();

export default SocketService;
