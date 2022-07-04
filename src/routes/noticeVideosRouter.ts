import express, { Request, Response } from "express";
import { BaseNoticeVideos } from "../types/noticeVideos";
import * as noticeVideosModel from "../models/noticeVideos";

export const noticeVideosRouter = express.Router();

noticeVideosRouter.get("/", async (req: Request, res: Response) => {
  try {
    const videos = await noticeVideosModel.findAllVideo();
    res.status(200).json(videos);
  } catch (e) {
    res.sendStatus(500);
  }
});

noticeVideosRouter.post("/", (req: Request, res: Response) => {
  const item: BaseNoticeVideos = req.body;
  noticeVideosModel.insertVideo(item, (error: Error) => {
    try {
      if (error) throw Error(error.message);
      res.sendStatus(201);
    } catch {
      res.sendStatus(500);
    }
  });
});

noticeVideosRouter.delete("/:id", (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  noticeVideosModel.deleteVideo(id, (error: Error) => {
    try {
      if (error) throw Error(error.message);
      res.sendStatus(204);
    } catch (e) {
      res.sendStatus(500);
    }
  });
});
