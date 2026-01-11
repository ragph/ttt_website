// Tourist Spot API Types

export interface TouristSpotDetail {
  id?: string;
  name: string;
  description: string;
  images: string[];
  province: string;
  region: string;
  address?: string;
  trivia?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface TouristSpotListItem {
  id?: string;
  name: string;
  province: string;
  region: string;
  thumbnail?: string;
  description: string;
}

export interface GetTouristSpotParams {
  regionName: string;
  province: string;
  spotName: string;
}

export interface GetTouristSpotsByRegionParams {
  regionName: string;
}

export interface GetTouristSpotsByProvinceParams {
  regionName: string;
  province: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ApiError {
  success: false;
  message: string;
  error?: any;
}
