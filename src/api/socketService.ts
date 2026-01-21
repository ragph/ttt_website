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
  private surveyToken: string | null = null;

  connect(token: string): Socket {
    // If already connected with the same token, return existing socket
    if (this.socket?.connected && this.surveyToken === token) {
      return this.socket;
    }

    // Disconnect existing socket if connecting with different token
    if (this.socket) {
      this.disconnect();
    }

    this.surveyToken = token;

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
      // Join the survey room for real-time updates
      this.joinSurveyRoom(token);
    });

    this.socket.on("disconnect", (reason: string) => {
      console.log("❌ Socket disconnected:", reason);
    });

    this.socket.on("connect_error", (error: Error) => {
      console.error("🔴 Socket connection error:", error.message);
    });

    this.socket.on("reconnect", (attemptNumber: number) => {
      console.log("🔄 Socket reconnected after", attemptNumber, "attempts");
      // Rejoin the survey room after reconnection
      if (this.surveyToken) {
        this.joinSurveyRoom(this.surveyToken);
      }
    });

    return this.socket;
  }

  private joinSurveyRoom(token: string) {
    if (this.socket?.connected) {
      console.log("📊 Joining survey room:", token);
      this.socket.emit("join-survey", { token });
    }
  }

  onVoteUpdate(callback: (data: any) => void): void {
    if (this.socket) {
      // Remove existing listener to avoid duplicates
      this.socket.off("vote-update");
      this.socket.on("vote-update", (data: any) => {
        console.log("📥 Received vote update:", data);
        callback(data);
      });
    }
  }

  onSurveyResults(callback: (data: any) => void): void {
    if (this.socket) {
      // Remove existing listener to avoid duplicates
      this.socket.off("survey-results");
      this.socket.on("survey-results", (data: any) => {
        console.log("📥 Received survey results:", data);
        callback(data);
      });
    }
  }

  disconnect(): void {
    if (this.socket) {
      console.log("🔌 Disconnecting socket");
      this.socket.disconnect();
      this.socket = null;
      this.surveyToken = null;
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
