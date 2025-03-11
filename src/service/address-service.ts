import { Address, User } from "@prisma/client";
import { AddressResponse, CreateAddressRequest, DeleteAddressRequest, GetAddressRequest, SearchAddressRequest, toAddressResponse, UpdateAddressRequest } from "../model/address-model";
import { Validation } from "../validation/validation";
import { AddressValidation } from "../validation/address-validation";
import { ContactService } from "./contact-service";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { Pageable } from "../model/page";

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
    await this.checkAddress(updateRequest.contact_id, updateRequest.id);

    const address = await prismaClient.address.update({
      where: {
        contact_id: updateRequest.contact_id,
        id: updateRequest.id,
      },
      data: updateRequest,
    });

    return toAddressResponse(address);
  }

  static async delete(user: User, req: DeleteAddressRequest ): Promise<string>{
    const deleteRequest = Validation.validate(AddressValidation.DELETE, req);
    await ContactService.get(user, deleteRequest.contact_id);
    await this.checkAddress(deleteRequest.contact_id, deleteRequest.address_id);
    await prismaClient.address.deleteMany({
      where: {
        contact_id: deleteRequest.contact_id,
        id: deleteRequest.address_id,
      }
    });

    return "OK";
  };

  static async search(user: User, request: SearchAddressRequest): Promise<Pageable<AddressResponse>> {
    const searchRequest = Validation.validate(AddressValidation.SEARCH, request);
    await ContactService.get(user, searchRequest.contact_id);

    const filters = []
    if(searchRequest.keyword){
      filters.push({
        OR:[
          {
            street: {
              contains: searchRequest.keyword,
            }
          },
          {
            city: {
              contains: searchRequest.keyword,
            }
          },
          {
            province: {
              contains: searchRequest.keyword,
            }
          },
          {
            country: {
              contains: searchRequest.keyword,
            }
          },
          {
            postal_code: {
              contains: searchRequest.keyword,
            }
          },
        ]
      });
    }

    const addresses = await prismaClient.address.findMany({
      where: { 
        contact_id: searchRequest.contact_id,
        AND: filters,
      },
      take: searchRequest.size,
      skip: (searchRequest.page! - 1) * searchRequest.size!,
    });

    const total = await prismaClient.address.count({
      where: {
        contact_id: searchRequest.contact_id,
        AND: filters,
      }
    });

    return {
      data: addresses.map( e => toAddressResponse(e)),
      paging: {
        total_page: Math.ceil(total / searchRequest.size!),
        current_page: searchRequest.page!, 
        size: searchRequest.size!,
      }
    }
  }
}
