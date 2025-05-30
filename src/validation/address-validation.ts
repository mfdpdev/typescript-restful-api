import { ZodType, z } from "zod";

export class AddressValidation {
  static readonly CREATE: ZodType = z.object({
    street: z.string().min(1).max(255).optional(),
    city: z.string().min(1).max(100).optional(),
    province: z.string().min(1).max(100).optional(),
    country: z.string().min(1).max(100),
    postal_code: z.string().min(1).max(10),
    contact_id: z.number().positive(),
  });

  static readonly GET: ZodType = z.object({
    contact_id: z.number().positive(),
    address_id: z.number().positive(),
  });

  static readonly DELETE: ZodType = z.object({
    contact_id: z.number().positive(),
    address_id: z.number().positive(),
  });

  static readonly UPDATE: ZodType = z.object({
    contact_id: z.number().positive(),
    id: z.number().positive(),
    street: z.string().min(1).max(255).optional(),
    city: z.string().min(1).max(100).optional(),
    province: z.string().min(1).max(100).optional(),
    country: z.string().min(1).max(100).optional(),
    postal_code: z.string().min(1).max(10).optional(),
  });

  static readonly SEARCH: ZodType = z.object({
    contact_id: z.number().positive(),
    keyword: z.string().min(1).max(100).optional(),
    province: z.string().min(1).max(100).optional(),
    page: z.number().positive().optional(),
    size: z.number().positive().optional(),
  });
}
