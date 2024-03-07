import {FileResponse} from './NewsResponse';

export interface NewsBannerResponse {
  id: number;
  title: string;
  bannerUrl: FileResponse | null;
  redirectUrl: string | null;
  newsId: number | null;
  isShow: boolean;
}
