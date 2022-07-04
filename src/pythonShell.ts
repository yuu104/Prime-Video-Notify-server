import { Options, PythonShell } from "python-shell";
import * as dotenv from "dotenv";

dotenv.config();

const options: Options = {
  pythonPath: process.env.LOCAL_PYTHON_PATH,
  scriptPath: "scraping",
};

interface primeVideo {
  title: string;
  url: string;
}

interface primeVideoInfo {
  available: boolean;
  isLeavingSoon: boolean;
}

export const searchVideos = async (keyword: string) => {
  const shell = new PythonShell("searchVideos.py", options);
  shell.send(keyword);
  const videos: primeVideo[] = await new Promise((resolve, reject) => {
    shell.on("message", (data) => {
      resolve(JSON.parse(data));
    });
    shell.end((error) => {
      if (error) reject(error);
    });
  });
  return videos ? videos : null;
};

export const getPrimeVideoInfo = async (url: string) => {
  const shell = new PythonShell("getVideoInfo.py", options);
  shell.send(url);
  const info: primeVideoInfo = await new Promise((resolve, reject) => {
    shell.on("message", (data) => {
      resolve(JSON.parse(data));
    });
    shell.end((error) => {
      if (error) reject(error);
    });
  });
  return info ? info : null;
};
