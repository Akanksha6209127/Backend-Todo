// import { Request, Response } from "express";

// import {
//   getTodosService,
//   createTodoService,
//   updateTodoService,
//   deleteTodoService,
// } from "../services/todo.service";

// export const getTodos = async (req: Request, res: Response) => {
//   try {
//     const todos = await getTodosService();
//     res.json(todos);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to fetch todos" });
//   }
// };

// export const createTodo = async (req: Request, res: Response) => {
//   try {
//     const { title, amount, unit } = req.body;
//     const userId = req.user._id;
//     const todo = await createTodoService({ title, userId, amount, unit });
//     res.status(201).json(todo);
//   } catch (error) {
//     res.status(400).json({ message: "Failed to create todo" });
//   }
// };

// export const updateTodo = async (req: Request, res: Response) => {
//   try {
//     const todo = await updateTodoService(req.params.id, req.body);
//     if (!todo) return res.status(404).json({ message: "Todo not found" });
//     res.json(todo);
//   } catch (error) {
//     res.status(400).json({ message: "Failed to update todo" });
//   }
// };

// export const deleteTodo = async (req: Request, res: Response) => {
//   try {
//     const todo = await deleteTodoService(req.params.id);
//     if (!todo) return res.status(404).json({ message: "Todo not found" });
//     res.json({ message: "Todo deleted" });
//   } catch (error) {
//     res.status(400).json({ message: "Failed to delete todo" });
//   }
// };


import { Response } from "express";
import {
  getTodosService,
  createTodoService,
  updateTodoService,
  deleteTodoService,
} from "../services/todo.service";
import { AuthRequest } from "../middlewares/auth.middleware"; // 👈 yeh import karo

// ================== Get Todos ==================
export const getTodos = async (req: AuthRequest, res: Response) => {
  try {
    const todos = await getTodosService(req.user?._id); // 👈 userId pass karo
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch todos" });
  }
};

// ================== Create Todo ==================
export const createTodo = async (req: AuthRequest, res: Response) => {
  try {
    const { title, amount, unit } = req.body;
    const userId = req.user?._id; // 👈 safe check
    if (!userId) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const todo = await createTodoService({ title, userId,  amount, unit });
    res.status(201).json(todo);
  } catch (error) {
    res.status(400).json({ message: "Failed to create todo" });
  }
};

// ================== Update Todo ==================
export const updateTodo = async (req: AuthRequest, res: Response) => {
  try {
    const todo = await updateTodoService(req.params.id, req.body);
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.json(todo);
  } catch (error) {
    res.status(400).json({ message: "Failed to update todo" });
  }
};

// ================== Delete Todo ==================
export const deleteTodo = async (req: AuthRequest, res: Response) => {
  try {
    const todo = await deleteTodoService(req.params.id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.json({ message: "Todo deleted" });
  } catch (error) {
    res.status(400).json({ message: "Failed to delete todo" });
  }
};
