import express from "express";
import { authMiddleware } from "../middleware/auth-middleware";
import { UserController } from "../controller/user-controller";
import { ContactController } from "../controller/contact-controller";
import { AddressController } from "../controller/address-controller";

export const apiRouter = express.Router();

apiRouter.use(authMiddleware);
apiRouter.get("/users/current", UserController.get);
apiRouter.patch("/users/current", UserController.update);
apiRouter.delete("/users/current", UserController.logout);

apiRouter.post("/contacts", ContactController.create);
apiRouter.get("/contacts/:contactId(\\d+)", ContactController.get);
apiRouter.patch("/contacts/:contactId(\\d+)", ContactController.update);
apiRouter.delete("/contacts/:contactId(\\d+)", ContactController.delete);
apiRouter.get("/contacts", ContactController.search);

apiRouter.post("/contacts/:contactId(\\d+)/addresses", AddressController.create);
apiRouter.get("/contacts/:contactId(\\d+)/addresses/:addressId(\\d+)", AddressController.get);
