import express from "express";
import { UserController } from "../controller/user-controller";

export const publicRouter = express.Router();

publicRouter.post("/users", UserController.register);
publicRouter.post("/users/login", UserController.login);
