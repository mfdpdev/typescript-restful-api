import { Contact, User } from "@prisma/client";
import { ContactResponse, CreateContactRequest, SearchContactReqest, toContactResponse, UpdateContactRequest } from "../model/contact-model";
import { ContactValidation } from "../validation/contact-validation";
import { Validation } from "../validation/validation";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { Container } from "winston";
import { Pageable } from "../model/page";

export class ContactService {
  static async create(user: User, request: CreateContactRequest): Promise<ContactResponse>{
    const createRequest = Validation.validate(ContactValidation.CREATE, request);

    const record = {
      ...createRequest,
      username: user.username,
    }

    const contact = await prismaClient.contact.create({
      data: record,
    });

    return toContactResponse(contact);
  }

  private static async checkContact(user: User, contactId: number): Promise<Contact> {
    const contact = await prismaClient.contact.findFirst({
      where: {
        username: user.username,
        id: contactId,
      }
    });

    if(!contact){
      throw new ResponseError(404, "Contact not found");
    }

    return contact;
  }

  static async get(user: User, contactId: number): Promise<ContactResponse> {
    const contact = await this.checkContact(user, contactId);
    return toContactResponse(contact);
  }

  static async update(user: User, request: UpdateContactRequest): Promise<ContactResponse> {
    const updateRequest = Validation.validate(ContactValidation.UPDATE, request);
    await this.checkContact(user, request.id);

    const contact = await prismaClient.contact.update({
      where: {
        id: request.id,
        username: user.username,
      },
      data: updateRequest,
    });

    return toContactResponse(contact);
  }

  static async delete(user: User, contactId: number): Promise<string> {
    await this.checkContact(user, contactId);
    await prismaClient.contact.delete({
      where: {
        username: user.username,
        id: contactId,
      }
    });

    return "OK";
  }

  static async search(user: User, request: SearchContactReqest): Promise<Pageable<ContactResponse>> {
    const searchRequest = Validation.validate(ContactValidation.SEARCH, request);

    const filters = [];
    if(searchRequest.name){
      filters.push({
        OR: [
          {
            first_name: {
              contains: searchRequest.name
            }
          },
          {
            last_name: {
              contains: searchRequest.name
            }
          }
        ]
      });
    }

    if(searchRequest.email){
      filters.push({
        email: {
          contains: searchRequest.email,
        }
      });
    }

    if(searchRequest.phone){
      filters.push({
        phone:{
          contains: searchRequest.phone,
        }
      });
    }

    const contacts = await prismaClient.contact.findMany({
      where: {
        username: user.username,
        AND: filters,
      },
      take: searchRequest.size,
      skip: (searchRequest.page! - 1) * searchRequest.size!,
    });

    const total = await prismaClient.contact.count({
      where: {
        username: user.username,
        AND: filters,
      }
    });

    return {
      data: contacts.map( e => toContactResponse(e)),
      paging: {
        current_page: Number(searchRequest.page),
        total_page: Math.ceil(total / searchRequest.size!),
        size: Number(searchRequest.size),
      }
    }

  }
}
