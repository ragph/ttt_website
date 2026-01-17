import axiosClient from './axiosClient';
import type {
  Blog,
  BlogCategory,
  BlogListResponse,
  BlogDetailResponse,
  BlogCategoriesResponse,
  BlogListParams,
} from './types/blog.types';

class BlogApiService {
  /**
   * Get paginated list of published blogs
   */
  async getBlogs(params: BlogListParams = {}): Promise<BlogListResponse> {
    try {
      const { limit = 4, offset = 0, category } = params;

      const queryParams = new URLSearchParams();
      queryParams.append('limit', limit.toString());
      queryParams.append('offset', offset.toString());
      if (category) {
        queryParams.append('category', category);
      }

      const response = await axiosClient.get(`/blogs?${queryParams.toString()}`) as BlogListResponse;
      return response;
    } catch (error) {
      console.error('Error fetching blogs:', error);
      return {
        data: [],
        meta: {
          total: 0,
          offset: 0,
          limit: 4,
          hasMore: false,
          loaded: 0,
        },
      };
    }
  }

  /**
   * Get a single blog by ID
   */
  async getBlogById(id: number | string): Promise<Blog | null> {
    try {
      const response = await axiosClient.get(`/blogs/${id}`) as BlogDetailResponse;
      return response.data || null;
    } catch (error) {
      console.error('Error fetching blog:', error);
      return null;
    }
  }

  /**
   * Get all active blog categories
   */
  async getCategories(): Promise<BlogCategory[]> {
    try {
      const response = await axiosClient.get('/blogs/categories') as BlogCategoriesResponse;
      return response.data || [];
    } catch (error) {
      console.error('Error fetching blog categories:', error);
      return [];
    }
  }
}

// Export singleton instance
export const blogApi = new BlogApiService();

// Export the class for testing purposes
export default BlogApiService;
