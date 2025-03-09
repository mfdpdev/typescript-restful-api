import { Contact, User } from "@prisma/client";
import { ContactResponse, CreateContactRequest, toContactResponse } from "../model/contact-model";
import { ContactValidation } from "../validation/contact-validation";
import { Validation } from "../validation/validation";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";

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
}
