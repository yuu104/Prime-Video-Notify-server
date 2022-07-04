export interface BaseNoticeVideos {
  title: string;
  url: string;
  is_leaving_soon: boolean;
}

export interface NoticeVideos extends BaseNoticeVideos {
  id: number;
}
