import express from "express";
import { authMiddleware } from "../middleware/auth-middleware";
import { UserController } from "../controller/user-controller";
import { ContactController } from "../controller/contact-controller";

export const apiRouter = express.Router();

apiRouter.use(authMiddleware);
apiRouter.get("/users/current", UserController.get);
apiRouter.patch("/users/current", UserController.update);
apiRouter.delete("/users/current", UserController.logout);

apiRouter.post("/contacts", ContactController.create);
