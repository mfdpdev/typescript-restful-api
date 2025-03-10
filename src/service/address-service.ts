import { Address, User } from "@prisma/client";
import { AddressResponse, CreateAddressRequest, GetAddressRequest, toAddressResponse, UpdateAddressRequest } from "../model/address-model";
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

    const address = await this.checkAddress(getRequest.contact_id, getRequest.address_id);
    return toAddressResponse(address);
  }

  private static async checkAddress(contactId: number, addressId: number): Promise<Address>{
    const address = await prismaClient.address.findFirst({
      where: {
        id: addressId,
        contact_id: contactId,
      }
    });

    if(!address){
      throw new ResponseError(404, "Address not found");
    }
    return address;
  }

  static async update(user: User, req: UpdateAddressRequest ): Promise<AddressResponse>{
    const updateRequest = Validation.validate(AddressValidation.UPDATE, req);
    await ContactService.get(user, updateRequest.contact_id);
    await this.checkAddress(updateRequest.contact_id, updateRequest.address_id);

    const address = await prismaClient.address.update({
      where: {
        contact_id: updateRequest.contact_id,
        id: updateRequest.id,
      },
      data: updateRequest,
    });

    return toAddressResponse(address);
  }
}
