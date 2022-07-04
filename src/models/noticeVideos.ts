import { BaseNoticeVideos, NoticeVideos } from "../types/noticeVideos";
import { pool } from "../connection";

export const findAllVideo = async () => {
  const sql = "SELECT * FROM notice_videos";
  const videos: NoticeVideos[] = await new Promise((resolve, reject) => {
    pool.query(sql, (error, result: NoticeVideos[]) => {
      if (error) reject(error);
      resolve(result);
    });
  });
  return videos;
};

export const insertVideo = (videos: BaseNoticeVideos, callback: Function) => {
  const sql =
    "INSERT INTO notice_videos (title, url, is_leaving_soon) VALUES (?, ?, ?)";
  pool.query(
    sql,
    [videos.title, videos.url, videos.is_leaving_soon],
    (error, result) => {
      if (error) {
        callback(error);
      } else {
        callback(null);
      }
    }
  );
};

export const deleteVideo = (id: number, callback: Function) => {
  const sql = "DELETE FROM notice_videos WHERE id=?";
  pool.query(sql, [id], (error, result) => {
    if (error) {
      callback(error);
    } else {
      callback(null);
    }
  });
};
