

import { z } from "zod";

export const signupSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    email: z.email(),
    password: z.string().min(6),
  }),
});

export const signinSchema = z.object({
  body: z.object({
    email: z.email(),
    password: z.string().min(1),
  }),
});
