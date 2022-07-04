import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { noticeVideosRouter } from "./routes/noticeVideosRouter";
import { primeVideosRouter } from "./routes/primeVideosRouter";
import { fn } from "./notice";

dotenv.config();

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api/notice-videos", noticeVideosRouter);
app.use("/api/prime-videos", primeVideosRouter);

fn();

app.listen(process.env.PORT || 5001, () => {
  console.log("Server running");
});
