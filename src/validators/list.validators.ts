
import { z } from "zod";

export const createListSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    groupId: z.string().min(1),
    
    
  }),
});

export const updateListSchema = z.object({
  params: z.object({ id: z.string().min(1) }),
  body: z.object({
    name: z.string().min(1).optional(),
    completed: z.boolean().optional(), 
  }),
});
