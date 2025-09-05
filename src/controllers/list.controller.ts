import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import List from "../models/list.model";
import Group from "../models/group.model";
import Todo from "../models/todo.model";

export const getLists = asyncHandler(async (req: Request, res: Response) => {
  const { groupId } = req.query;
  const filter: any = { user: req.user!._id };
  if (groupId) filter.groupId = groupId;
  const lists = await List.find(filter).sort({ createdAt: 1 });
  res.json(lists);
});

export const createList = asyncHandler(async (req: Request, res: Response) => {
  const { name, groupId } = req.body;
  const group = await Group.findOne({ _id: groupId, user: req.user!._id });
  if (!group) return res.status(400).json({ message: "Invalid groupId" });
  if (group.type !== "list")
    return res.status(400).json({ message: "Lists can only be created under 'list' groups" });

  const list = await List.create({ name, groupId, user: req.user!._id });
  res.status(201).json(list);
});

export const renameList = asyncHandler(async (req: Request, res: Response) => {
  
  const { id } = req.params;
  const { name, completed } = req.body;

  const updateFields: any = {};
  if (name !== undefined) updateFields.name = name;
  if (completed !== undefined) updateFields.completed = completed;

  const updated = await List.findOneAndUpdate(
    { _id: id, user: req.user!._id },
    { $set: updateFields },
    { new: true }
  );

  if (!updated) return res.status(404).json({ message: "List not found" });

  res.json(updated);
  
});

export const deleteList = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const list = await List.findOneAndDelete({ _id: id, user: req.user!._id });
  if (!list) return res.status(404).json({ message: "List not found" });

  await Todo.deleteMany({ listId: id, user: req.user!._id });
  res.json({ message: "List and its todos deleted" });
});


