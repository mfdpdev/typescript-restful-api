import { NextFunction, Response } from "express";
import { UserRequest } from "../type/user-request";
import { ContactService } from "../service/contact-service";
import { SearchContactReqest, UpdateContactRequest } from "../model/contact-model";

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

  static async get(req: UserRequest, res: Response, next: NextFunction){
    try {
      const contactId: number = Number(req.params.contactId);
      const response = await ContactService.get(req.user!, contactId);
      res.status(200).json({
        data: response,
      })
    } catch (e) {
      next(e);
    }
  }

  static async update(req: UserRequest, res: Response, next: NextFunction){
    try {
      const contactId: number = Number(req.params.contactId);
      const request: UpdateContactRequest = req.body as UpdateContactRequest;
      request.id = contactId;
      const response = await ContactService.update(req.user!, request);
      res.status(200).json({
        data: response,
      })
    } catch (e) {
      next(e);
    }
  }

  static async delete(req: UserRequest, res: Response, next: NextFunction){
    try {
      const contactId: number = Number(req.params.contactId);
      const response = await ContactService.delete(req.user!, contactId);
      res.status(200).json({
        data: response,
      })
    } catch (e) {
      next(e);
    }
  }

  static async search(req: UserRequest, res: Response, next: NextFunction){
    try {
      const request: SearchContactReqest = {
        name: req.query.name as string,
        email: req.query.email as string,
        phone: req.query.phone as string,
        page: req.query.page ? Number(req.query.page) : 1,
        size: req.query.size ? Number(req.query.size) : 10,
      }

      const response = await ContactService.search(req.user!, request);
      res.status(200).json(response)
    } catch (e) {
      next(e);
    }
  }
}
