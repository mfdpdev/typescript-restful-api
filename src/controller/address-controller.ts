import { NextFunction, Response } from "express";
import { AddressService } from "../service/address-service";
import { UserRequest } from "../type/user-request";
import { CreateAddressRequest, DeleteAddressRequest, GetAddressRequest, SearchAddressRequest, UpdateAddressRequest } from "../model/address-model";

export class AddressController {
  static async create(req: UserRequest, res: Response, next: NextFunction){
    try {
      const request: CreateAddressRequest = req.body as CreateAddressRequest;
      request.contact_id = Number(req.params.contactId);
      const response = await AddressService.create(req.user!, request);
      res.status(201).json({
        data: response,
      })
    } catch (e){
      next(e);
    }
  }

  static async get(req: UserRequest, res: Response, next: NextFunction){
    try {
      const request: GetAddressRequest = {
        contact_id: Number(req.params.contactId),
        address_id: Number(req.params.addressId),
      }
      const response = await AddressService.get(req.user!, request);
      res.status(200).json({
        data: response,
      })
    } catch (e){
      next(e);
    }
  }

  static async update(req: UserRequest, res: Response, next: NextFunction){
    try {
      const request: UpdateAddressRequest = req.body as UpdateAddressRequest;
      request.id = Number(req.params.addressId);
      request.contact_id = Number(req.params.contactId);
      const response = await AddressService.update(req.user!, request);
      res.status(200).json({
        data: response,
      })
    } catch (e){
      next(e);
    }
  }

  static async delete(req: UserRequest, res: Response, next: NextFunction){
    try {
      const request: DeleteAddressRequest = {
        address_id: Number(req.params.addressId),
        contact_id: Number(req.params.contactId),
      }
      const response = await AddressService.delete(req.user!, request);
      res.status(200).json({
        data: response,
      })
    } catch (e){
      next(e);
    }
  }

  static async list(req: UserRequest, res: Response, next: NextFunction){
    try {
      const request: SearchAddressRequest = {
        contact_id: Number(req.params.contactId),
        keyword: req.query.keyword as string,
        page: req.query.page ? Number(req.query.page) : 1,
        size: req.query.size ? Number(req.query.size) : 10,
      }

      const response = await AddressService.search(req.user!, request);
      res.status(200).json(response);
    } catch (e){
      next(e);
    }
  }
}
