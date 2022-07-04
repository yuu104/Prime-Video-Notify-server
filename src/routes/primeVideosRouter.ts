import express, { Request, Response } from "express";
import { getPrimeVideoInfo, searchVideos } from "../pythonShell";

export const primeVideosRouter = express.Router();

primeVideosRouter.get("/", async (req: Request, res: Response) => {
  try {
    const keyword: string = req.query.keyword as string;
    const videos = await searchVideos(keyword);
    res.status(200).json(videos);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

primeVideosRouter.get("/video-info", async (req: Request, res: Response) => {
  try {
    const url: string = req.body.url;
    const info = await getPrimeVideoInfo(url);
    res.status(200).json(info);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});
