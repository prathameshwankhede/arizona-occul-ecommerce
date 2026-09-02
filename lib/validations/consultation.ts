import { z } from "zod";

export const consultationSchema = z.object({
  serviceId: z.number().int().positive().optional(),
  name: z.string().min(2, "Name is required").max(100),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  preferredDate: z.string().optional(),
  preferredTime: z.string().max(50).optional(),
  message: z.string().max(1000).optional(),
});

export type ConsultationInput = z.infer<typeof consultationSchema>;
