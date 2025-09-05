// import { z } from "zod";

// export const listTodoQuerySchema = z.object({
//   query: z.object({
//     groupId: z.string().min(1)
//   })
// });

// export const createTodoSchema = z.object({
//   body: z.object({
//     title: z.string().min(1),
//     amount: z.number().optional(),
//     unit: z.string().optional(),
//     groupId: z.string().min(1)
//   })
// });

// export const updateTodoSchema = z.object({
//   params: z.object({ id: z.string().min(1) }),
//   body: z.object({
//     title: z.string().min(1).optional(),
//     amount: z.number().optional(),
//     unit: z.string().optional(),
//     completed: z.boolean().optional()
//   })
// });


import { z } from "zod";

export const createTodoSchema = z.object({
  body: z.object({
    title: z.string().min(1),
    amount: z.number().nonnegative(),
    unit: z.string().min(1),
    completed: z.boolean().optional(),
    listId: z.string().optional(),
    groupId: z.string().optional(),
  }).refine((d) => d.listId || d.groupId, {
    message: "Either listId or groupId is required",
    path: ["listId"],
  }),
});

export const updateTodoSchema = z.object({
  params: z.object({ id: z.string().min(1) }),
  body: z.object({
    title: z.string().min(1).optional(),
    amount: z.number().nonnegative().optional(),
    unit: z.string().min(1).optional(),
    completed: z.boolean().optional(),
  }),
});
