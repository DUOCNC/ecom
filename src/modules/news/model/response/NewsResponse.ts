import {NewsCategoryResponse} from './NewsCategoryResponse';

export interface FileResponse {
  url: string;
  mimetype: string;
}
export interface ThumbnailResponse {
  url: string;
  mimetype: string;
}

export interface ContentFileResponse {
  url: string;
  mimetype: string;
}
export interface NewsResponse {
  id: number;
  title: string;
  content: string;
  shortContent: string | null;
  contentFile: FileResponse;
  thumbnail: FileResponse;
  applicableSystem: string;
  isHotNews: boolean;
  requireLogin: boolean;
  displayTimeFrom: Date | null;
  displayTimeTo: Date | null;
  createdAt: Date | null;
  category: NewsCategoryResponse | null;
  fileType: string;
  updatedAt: Date | null;
  description: string;
}
