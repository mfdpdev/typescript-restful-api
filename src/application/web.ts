import express from "express";
import { publicRouter } from "../route/public-api";
import { errorMiddleware } from "../middleware/error-middleware";

export const web = express();
web.use(express.json());
const prefix: string = "/api/v1";

web.use(prefix, publicRouter);
web.use(errorMiddleware);
