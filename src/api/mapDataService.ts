import { touristSpotApi } from './touristSpotApi';
import { regionalData, RegionData, TouristSpot } from '../views/pages/map/data/RegionalData';
import { API_IMAGE_BASE_URL } from '../utils/constants';

/**
 * Service to load and merge regional map data with tourist spots from API
 */
class MapDataService {
  private cachedRegionalData: RegionData[] | null = null;

  /**
   * Get regional data with tourist spots loaded from API
   * This merges the static regional boundaries with dynamic tourist spot data
   */
  async getRegionalData(): Promise<RegionData[]> {
    // Return cached data if already loaded
    if (this.cachedRegionalData) {
      return this.cachedRegionalData;
    }

    try {
      // Fetch all tourist spots from API
      const touristSpots = await touristSpotApi.getAllTouristSpots();

      // Create a map of region name to tourist spots
      const spotsByRegion = new Map<string, TouristSpot[]>();

      touristSpots.forEach((spot) => {
        if (!spotsByRegion.has(spot.region)) {
          spotsByRegion.set(spot.region, []);
        }

        // Convert relative image paths to absolute URLs
        const absoluteImages = spot.images.map((img) => {
          // If it's already a full URL (http/https), return as is
          if (img.startsWith('http://') || img.startsWith('https://')) {
            return img;
          }
          // Otherwise, prepend the API base URL
          return `${API_IMAGE_BASE_URL}${img}`;
        });

        spotsByRegion.get(spot.region)!.push({
          name: spot.name,
          description: spot.description,
          images: absoluteImages,
          province: spot.province,
          address: spot.address,
          trivia: spot.trivia,
        });
      });

      // Merge with regional boundaries data
      const mergedData = regionalData.map((region) => ({
        ...region,
        touristSpots: spotsByRegion.get(region.region) || [],
      }));

      // Cache the result
      this.cachedRegionalData = mergedData;

      return mergedData;
    } catch (error) {
      console.error('Error loading regional data from API:', error);
      // Fallback to static data if API fails
      console.warn('Falling back to static map data');
      return regionalData;
    }
  }

  /**
   * Clear the cache to force reload from API
   */
  clearCache(): void {
    this.cachedRegionalData = null;
  }

  /**
   * Check if data is loaded from cache
   */
  isCached(): boolean {
    return this.cachedRegionalData !== null;
  }
}

// Export singleton instance
export const mapDataService = new MapDataService();

// Export the class for testing purposes
export default MapDataService;
