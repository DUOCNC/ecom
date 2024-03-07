import {BlockCommentType, InteractionEnum} from '../enums';

export type IInteractionMetaData = {
  content: string;
};
export type ICommentMetaData = {
  post_id: string;
};
export interface ISender {
  id: string;
  name?: string;
  email?: string;
  global_user_id?: string;
}
export interface IAdsMetadata {
  ads_id: string;
  ad_title: string;
  photo_url?: string;
  video_url?: string;
  post_id: string;
  product_id?: string;
}
export interface IPage {
  fb_id: string;
  name: string;
  avatar: string;
  about?: string;
  link?: string;
  active?: boolean;
  department?: number;
}
export interface IPost {
  fb_id: string;
  fb_page: string;
  message: string;
  permalink_url: string;
  from: ISender;
  created_time: Date | string;
  images?: string[];
  videos?: string[];
  block_comment?: BlockCommentType;
}
export type IUserInteraction = {
  id: string;
  from: ISender;
  page_id: string;
  page: IPage;
  type: InteractionEnum;
  ads_metadata: IAdsMetadata;
  interaction_metadata: IInteractionMetaData;
  post_id: string;
  post: IPost;
  created_at: string;
  updated_at: string;
};

export interface IReactionHistoryRespon {
  items: IUserInteraction[];
  metadata: {
    total: number;
    limit: number;
    page: number;
  };
}
