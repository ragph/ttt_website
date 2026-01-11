import axiosClient from './axiosClient';
import type { User } from '../types';

export const userApi = {
  /**
   * Get current user profile
   */
  getCurrentUser: async (): Promise<User> => {
    return axiosClient.get('/user/profile');
  },

  /**
   * Update user profile
   */
  updateProfile: async (data: Partial<User>): Promise<User> => {
    return axiosClient.put('/user/profile', data);
  },

  /**
   * Get all users (admin only)
   */
  getAllUsers: async (): Promise<User[]> => {
    return axiosClient.get('/users');
  },

  /**
   * Get user by ID
   */
  getUserById: async (id: string): Promise<User> => {
    return axiosClient.get(`/users/${id}`);
  },

  /**
   * Delete user (admin only)
   */
  deleteUser: async (id: string): Promise<void> => {
    return axiosClient.delete(`/users/${id}`);
  },
};
