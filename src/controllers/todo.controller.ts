import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import Todo from "../models/todo.model";
import Group from "../models/group.model";
import List from "../models/list.model";

export const getTodos = asyncHandler(async (req: Request, res: Response) => {
  const { listId, groupId } = req.query;
  const filter: any = { user: req.user!._id };
  if (listId) filter.listId = listId;
  if (groupId) filter.groupId = groupId;
  const todos = await Todo.find(filter).sort({ createdAt: 1 });
  res.json(todos);
});

export const createTodo = asyncHandler(async (req: Request, res: Response) => {
  const { title, amount, unit, completed, listId, groupId } = req.body;

  if (listId) {
    const list = await List.findOne({ _id: listId, user: req.user!._id });
    if (!list) return res.status(400).json({ message: "Invalid listId" });
  } else if (groupId) {
    const group = await Group.findOne({ _id: groupId, user: req.user!._id });
    if (!group) return res.status(400).json({ message: "Invalid groupId" });
    if (group.type !== "todo")
      return res.status(400).json({ message: "Todos under group require a 'todo' type group" });
  } else {
    return res.status(400).json({ message: "Either listId or groupId is required" });
  }

  const todo = await Todo.create({
    title,
    amount,
    unit,
    completed: !!completed,
    listId,
    groupId,
    user: req.user!._id,
  });
  res.status(201).json(todo);
});

export const updateTodo = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updated = await Todo.findOneAndUpdate(
    { _id: id, user: req.user!._id },
    { $set: req.body },
    { new: true }
  );
  if (!updated) return res.status(404).json({ message: "Todo not found" });
  res.json(updated);
});

export const deleteTodo = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const deleted = await Todo.findOneAndDelete({ _id: id, user: req.user!._id });
  if (!deleted) return res.status(404).json({ message: "Todo not found" });
  res.json({ message: "Todo deleted" });
});
