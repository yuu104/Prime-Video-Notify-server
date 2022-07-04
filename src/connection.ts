import * as mysql from "mysql";
import * as dotenv from "dotenv";

dotenv.config();

export const pool = mysql.createPool({
  host: process.env.LOCAL_DB_HOST,
  user: process.env.LOCAL_DB_USER,
  password: process.env.LOCAL_DB_PASSWORD,
  database: process.env.LOCAL_DB,
});
