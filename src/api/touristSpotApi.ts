import axiosClient from './axiosClient';
import type {
  TouristSpotDetail,
  TouristSpotListItem,
  GetTouristSpotParams,
  GetTouristSpotsByRegionParams,
  GetTouristSpotsByProvinceParams,
  ApiResponse,
  ApiError,
} from './types/touristSpot.types';

// Interface for API response from backend
interface BackendTouristSpot {
  id: number;
  name: string;
  description: string;
  images: string[];
  province: string;
  region: string;
  address?: string;
  trivia?: string;
  latitude?: number;
  longitude?: number;
  isActive: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

interface BackendApiResponse {
  data: BackendTouristSpot[];
  meta: {
    total: number;
    perPage: number;
    currentPage: number;
    lastPage: number;
    firstPage: number;
    firstPageUrl: string;
    lastPageUrl: string;
    nextPageUrl: string | null;
    previousPageUrl: string | null;
  };
}

/**
 * API Service for Tourist Spots
 * Fetches tourist spots data from the backend API
 */
class TouristSpotApiService {
  /**
   * Fetch all tourist spots from the backend
   * Used for building the regional map data
   */
  async getAllTouristSpots(): Promise<BackendTouristSpot[]> {
    try {
      // Fetch all tourist spots (paginated, but we'll get all pages)
      const response = await axiosClient.get('/tourist-spots', {
        params: { limit: 1000 } // Get all spots at once
      }) as BackendApiResponse;
      return response.data;
    } catch (error) {
      console.error('Error fetching all tourist spots:', error);
      return [];
    }
  }
  /**
   * Get a single tourist spot by region, province, and spot name
   * API endpoint: GET /api/tourist-spots?region=...&province=...&search=...
   */
  async getTouristSpot(
    params: GetTouristSpotParams
  ): Promise<ApiResponse<TouristSpotDetail> | ApiError> {
    try {
      // Decode URL parameters
      const decodedRegionName = decodeURIComponent(params.regionName);
      const decodedProvince = decodeURIComponent(params.province);
      const decodedSpotName = decodeURIComponent(params.spotName);

      // Fetch from API with filters
      const response = await axiosClient.get('/tourist-spots', {
        params: {
          region: decodedRegionName,
          province: decodedProvince,
          search: decodedSpotName,
          limit: 1
        }
      }) as BackendApiResponse;

      if (!response.data || response.data.length === 0) {
        return {
          success: false,
          message: `Tourist spot "${decodedSpotName}" not found in ${decodedProvince}`,
        };
      }

      const touristSpot = response.data[0];

      // Get the API base URL from environment
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL.replace('/api', '');

      // Convert relative image paths to absolute URLs
      const absoluteImages = touristSpot.images.map((img: string) => {
        // If it's already a full URL (http/https), return as is
        if (img.startsWith('http://') || img.startsWith('https://')) {
          return img;
        }
        // Otherwise, prepend the API base URL
        return `${apiBaseUrl}${img}`;
      });

      // Transform to API response format
      const spotDetail: TouristSpotDetail = {
        id: touristSpot.id.toString(),
        name: touristSpot.name,
        description: touristSpot.description,
        images: absoluteImages,
        province: touristSpot.province,
        region: touristSpot.region,
        address: touristSpot.address,
        trivia: touristSpot.trivia,
        createdAt: touristSpot.createdAt,
        updatedAt: touristSpot.updatedAt,
      };

      return {
        success: true,
        data: spotDetail,
        message: 'Tourist spot retrieved successfully',
      };
    } catch (error) {
      console.error('Error fetching tourist spot:', error);
      return {
        success: false,
        message: 'Failed to fetch tourist spot',
        error,
      };
    }
  }

  /**
   * Get all tourist spots in a region
   * API endpoint: GET /api/tourist-spots?region=...
   */
  async getTouristSpotsByRegion(
    params: GetTouristSpotsByRegionParams
  ): Promise<ApiResponse<TouristSpotListItem[]> | ApiError> {
    try {
      const decodedRegionName = decodeURIComponent(params.regionName);

      // Fetch from API with region filter
      const response = await axiosClient.get('/tourist-spots', {
        params: {
          region: decodedRegionName,
          limit: 1000
        }
      }) as BackendApiResponse;

      if (!response.data) {
        return {
          success: false,
          message: `No tourist spots found in region "${decodedRegionName}"`,
        };
      }

      // Get the API base URL from environment
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL.replace('/api', '');

      const spots: TouristSpotListItem[] = response.data.map((spot: BackendTouristSpot) => {
        const thumbnail = spot.images[0];
        const absoluteThumbnail = thumbnail?.startsWith('http://') || thumbnail?.startsWith('https://')
          ? thumbnail
          : `${apiBaseUrl}${thumbnail}`;

        return {
          id: spot.id.toString(),
          name: spot.name,
          province: spot.province,
          region: spot.region,
          thumbnail: absoluteThumbnail,
          description: spot.description,
        };
      });

      return {
        success: true,
        data: spots,
        message: 'Tourist spots retrieved successfully',
      };
    } catch (error) {
      console.error('Error fetching tourist spots by region:', error);
      return {
        success: false,
        message: 'Failed to fetch tourist spots',
        error,
      };
    }
  }

  /**
   * Get all tourist spots in a specific province
   * API endpoint: GET /api/tourist-spots?province=...
   */
  async getTouristSpotsByProvince(
    params: GetTouristSpotsByProvinceParams
  ): Promise<ApiResponse<TouristSpotListItem[]> | ApiError> {
    try {
      const decodedRegionName = decodeURIComponent(params.regionName);
      const decodedProvince = decodeURIComponent(params.province);

      // Fetch from API with province filter
      const response = await axiosClient.get('/tourist-spots', {
        params: {
          region: decodedRegionName,
          province: decodedProvince,
          limit: 1000
        }
      }) as BackendApiResponse;

      if (!response.data) {
        return {
          success: false,
          message: `No tourist spots found in ${decodedProvince}`,
        };
      }

      // Get the API base URL from environment
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL.replace('/api', '');

      const spots: TouristSpotListItem[] = response.data.map((spot: BackendTouristSpot) => {
        const thumbnail = spot.images[0];
        const absoluteThumbnail = thumbnail?.startsWith('http://') || thumbnail?.startsWith('https://')
          ? thumbnail
          : `${apiBaseUrl}${thumbnail}`;

        return {
          id: spot.id.toString(),
          name: spot.name,
          province: spot.province,
          region: spot.region,
          thumbnail: absoluteThumbnail,
          description: spot.description,
        };
      });

      return {
        success: true,
        data: spots,
        message: 'Tourist spots retrieved successfully',
      };
    } catch (error) {
      console.error('Error fetching tourist spots by province:', error);
      return {
        success: false,
        message: 'Failed to fetch tourist spots',
        error,
      };
    }
  }
}

// Export singleton instance
export const touristSpotApi = new TouristSpotApiService();

// Export the class for testing purposes
export default TouristSpotApiService;
