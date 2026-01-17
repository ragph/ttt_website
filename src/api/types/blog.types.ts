// Blog API Types

export interface Blog {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  status: 'published' | 'draft' | 'archived';
  author: string;
  authorImage: string | null;
  datePosted: string;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
  isActive: boolean;
  displayOrder: number;
}

export interface BlogListMeta {
  total: number;
  offset: number;
  limit: number;
  hasMore: boolean;
  loaded: number;
}

export interface BlogListResponse {
  data: Blog[];
  meta: BlogListMeta;
}

export interface BlogDetailResponse {
  data: Blog;
}

export interface BlogCategoriesResponse {
  data: BlogCategory[];
}

export interface BlogListParams {
  limit?: number;
  offset?: number;
  category?: string;
}
