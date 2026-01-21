import axiosClient from './axiosClient';

export interface Destination {
  id: number;
  title: string;
  location: string;
  banner: string | null;
  icon: string | null;
  status: 'active' | 'inactive';
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface DestinationsResponse {
  data: Destination[];
  meta: {
    total: number;
    offset: number;
    limit: number;
    hasMore: boolean;
    loaded: number;
  };
}

export const destinationsApi = {
  /**
   * Get list of active destinations (public)
   */
  getDestinations: async (limit: number = 10, offset: number = 0): Promise<DestinationsResponse> => {
    try {
      const response = await axiosClient.get<any, DestinationsResponse>('/destinations', {
        params: { limit, offset },
      });
      return response;
    } catch (error) {
      console.error('Error fetching destinations:', error);
      return { data: [], meta: { total: 0, offset: 0, limit, hasMore: false, loaded: 0 } };
    }
  },

  /**
   * Get a single destination by ID (public)
   */
  getDestinationById: async (id: number): Promise<Destination | null> => {
    try {
      const response = await axiosClient.get<any, { data: Destination }>(`/destinations/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching destination:', error);
      return null;
    }
  },
};
