export interface NewsRequest {
  limit?: number;
  page?: number;
  info?: string;
  content?: string;
  createdAt?: string;
  categoryId?: number;
  isShow?: boolean;
  isHotNews?: boolean;
}

export interface NewsBannerRequest {
  limit?: number;
  page?: number;
  info?: string;
  title?: string;
  isShow?: boolean;
}
