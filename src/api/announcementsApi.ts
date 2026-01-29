import axiosClient from './axiosClient';

export interface Announcement {
  id: number;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  platform: 'website' | 'app' | 'both';
  startDate: string;
  endDate: string | null;
  createdAt: string;
  images: string[];
}

export interface AnnouncementsResponse {
  success: boolean;
  announcements: Announcement[];
}

export interface AnnouncementResponse {
  success: boolean;
  announcement: Announcement;
}

export const announcementsApi = {
  /**
   * Get all active public announcements
   */
  getAnnouncements: async (): Promise<Announcement[]> => {
    try {
      const response = await axiosClient.get<any, AnnouncementsResponse>('/public/announcements');
      if (response.success) {
        return response.announcements;
      }
      return [];
    } catch (error) {
      console.error('Error fetching announcements:', error);
      return [];
    }
  },

  /**
   * Get a single announcement by ID
   */
  getAnnouncementById: async (id: number): Promise<Announcement | null> => {
    try {
      const response = await axiosClient.get<any, AnnouncementResponse>(`/public/announcements/${id}`);
      if (response.success) {
        return response.announcement;
      }
      return null;
    } catch (error) {
      console.error('Error fetching announcement:', error);
      return null;
    }
  },
};
