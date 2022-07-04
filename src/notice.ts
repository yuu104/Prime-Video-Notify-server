import * as schedule from "node-schedule";
import * as noticeVideosModel from "./models/noticeVideos";
import { getPrimeVideoInfo } from "./pythonShell";
import * as request from "request";

export const fn = () => {
  schedule.scheduleJob("0 0 12 * * *", async () => {
    const videos = await getNoticeVideos();
    if (!videos) return;
    for (const video of videos) {
      const info = await getVideoInfo(video.url);
      if (!info) return;
      if (info.isLeavingSoon) {
        sendNoticeRequest(video.title);
      }
    }
  });
};

const getNoticeVideos = async () => {
  try {
    const videos = await noticeVideosModel.findAllVideo();
    return videos;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getVideoInfo = async (url: string) => {
  try {
    const info = await getPrimeVideoInfo(url);
    return info;
  } catch (e) {
    console.log(e);
    return null;
  }
};

const sendNoticeRequest = (title: string) => {
  const options: request.Options = {
    uri: "https://notify-api.line.me/api/notify",
    headers: {
      Authorization: `Bearer ${process.env.LINE_NOTIFY_TOKEN}`,
    },
    form: {
      message: `
      「${title}」が配信終了予定の作品になりました！
      `,
    },
  };

  request.post(options, (error, res, body) => {
    if (error) {
      console.log(error);
    }
    console.log(body);
  });
};
