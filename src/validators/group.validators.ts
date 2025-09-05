
import { z } from "zod";

export const createGroupSchema = z.object({
  body: z.object({
    title: z.string().min(1),
    type: z.enum(["todo", "list"]),
  }),
});

export const paramIdSchema = z.object({
  params: z.object({ id: z.string().min(1) }),
});
