import { z } from "zod";

export const productSchema = z.object({
  categoryId: z.number().int().positive("Category is required"),
  name: z.string().min(2, "Name is required").max(255),
  slug: z.string().min(2).max(255).optional(),
  sku: z.string().max(100).optional(),
  description: z.string().min(10, "Description is required"),
  price: z.number().positive("Price must be greater than 0"),
  salePrice: z.number().positive().optional().nullable(),
  stock: z.number().int().min(0, "Stock cannot be negative"),
  image: z.string().url().optional().nullable(),
  status: z.enum(["ACTIVE", "INACTIVE", "OUT_OF_STOCK"]).default("ACTIVE"),
});

export const categorySchema = z.object({
  name: z.string().min(2, "Name is required").max(255),
  slug: z.string().min(2).max(255).optional(),
  status: z.enum(["ACTIVE", "INACTIVE"]).default("ACTIVE"),
});

export const serviceSchema = z.object({
  name: z.string().min(2, "Name is required").max(255),
  slug: z.string().min(2).max(255).optional(),
  description: z.string().min(10, "Description is required"),
  price: z.number().positive().optional().nullable(),
  image: z.string().url().optional().nullable(),
  status: z.enum(["ACTIVE", "INACTIVE"]).default("ACTIVE"),
  sortOrder: z.number().int().min(0).default(0),
});

export type ProductInput = z.infer<typeof productSchema>;
export type CategoryInput = z.infer<typeof categorySchema>;
export type ServiceInput = z.infer<typeof serviceSchema>;
