import { Contact } from "@prisma/client";

export type ContactResponse = {
  id: number;
  first_name: string;
  last_name?: string | null;
  email?: string | null;
  phone?: string | null;
}

export type CreateContactRequest = {
  first_name: string;
  last_name?: string;
  email?: string;
  phone?: string;
}

export type UpdateContactRequest = {
  id: number;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
}

export type SearchContactReqest = {
  name?: string;
  email?: string;
  phone?: string;
  page?: number;
  size?: number;
}

export function toContactResponse(contact: Contact): ContactResponse {
  return {
    id: contact.id,
    first_name: contact.first_name,
    last_name: contact.last_name ?? null,
    email: contact.email ?? null,
    phone: contact.phone ?? null,
  }
}
