


import { Response } from "express";
import {
  getTodosService,
  createTodoService,
  updateTodoService,
  deleteTodoService,
} from "../services/todo.service";
import { AuthRequest } from "../middlewares/auth.middleware"; // 👈 yeh import karo


export const getTodos = async (req: AuthRequest, res: Response) => {
  try {
    const todos = await getTodosService(req.user?._id); // 👈 user pass karo
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch todos" });
  }
};


export const createTodo = async (req: AuthRequest, res: Response) => {
  try {
    const { title, amount, unit } = req.body;
    const user = req.user?._id; // 👈 safe check
    if (!user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const todo = await createTodoService({ title, user,  amount, unit });
    res.status(201).json(todo);
  } catch (error) {
    res.status(400).json({ message: "Failed to create todo" });
  }
};


export const updateTodo = async (req: AuthRequest, res: Response) => {
  try {
    const todo = await updateTodoService(req.params.id, req.body);
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.json(todo);
  } catch (error) {
    res.status(400).json({ message: "Failed to update todo" });
  }
};


export const deleteTodo = async (req: AuthRequest, res: Response) => {
  try {
    const todo = await deleteTodoService(req.params.id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.json({ message: "Todo deleted" });
  } catch (error) {
    res.status(400).json({ message: "Failed to delete todo" });
  }
};
