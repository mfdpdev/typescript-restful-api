import { User } from "@prisma/client";
import { AddressResponse, CreateAddressRequest, GetAddressRequest, toAddressResponse } from "../model/address-model";
import { Validation } from "../validation/validation";
import { AddressValidation } from "../validation/address-validation";
import { ContactService } from "./contact-service";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";

export class AddressService {

  static async create(user: User, req: CreateAddressRequest): Promise<AddressResponse> {
    const createRequest = Validation.validate(AddressValidation.CREATE, req);
    await ContactService.get(user, createRequest.contact_id);

    const address = await prismaClient.address.create({
      data: createRequest,
    });

    return toAddressResponse(address);
  }

  static async get(user: User, req: GetAddressRequest ): Promise<AddressResponse>{
    const getRequest = Validation.validate(AddressValidation.GET, req);
    await ContactService.get(user, getRequest.contact_id);

    const address = await prismaClient.address.findFirst({
      where: {
        id: getRequest.address_id,
        contact_id: getRequest.contact_id,
      }
    });

    if(!address){
      throw new ResponseError(404, "Address not found");
    }

    return toAddressResponse(address);
  }
}
