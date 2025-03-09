import { NextFunction, Response } from "express";
import { UserRequest } from "../type/user-request";
import { ContactService } from "../service/contact-service";

export class ContactController {
  static async create(req: UserRequest, res: Response, next: NextFunction){
    try {
      const response = await ContactService.create(req.user!, req.body);
      res.status(200).json({
        data: response,
      })
    } catch (e) {
      next(e);
    }
  }
}
