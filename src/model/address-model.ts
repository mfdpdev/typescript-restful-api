import { Address } from "@prisma/client";

export type AddressResponse = {
  id: number;
  street? : string | null,
  city? : string | null,
  province? : string | null,
  country : string,
  postal_code : string,
}

export type CreateAddressRequest = {
  contact_id: number,
  street?: string,
  city?: string,
  province?: string,
  country: string,
  postal_code: string,
}

export type GetAddressRequest = {
  contact_id: number,
  address_id: number,
}

export type DeleteAddressRequest = GetAddressRequest;

export type SearchAddressRequest = {
  contact_id: number,
  keyword?: string,
  page?: number,
  size?: number,
}

export type UpdateAddressRequest = {
  id: number,
  contact_id: number,
  street?: string,
  city?: string,
  province?: string,
  country?: string,
  postal_code?: string,
}

export function toAddressResponse(address: Address): AddressResponse {
  return {
    id: address.id,
    street: address.street,
    city : address.city,
    province : address.province,
    country : address.country,
    postal_code : address.postal_code,
  }
}
