import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import Group from "../models/group.model";
import List from "../models/list.model";
import Todo from "../models/todo.model";


export const getGroups = asyncHandler(async (req: Request, res: Response) => {
  const groups = await Group.find({ user: req.user!._id }).sort({ createdAt: 1 });
  res.json(groups);
});


export const createGroup = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { title, type } = req.body;

    if (!title || !type) {
      return res.status(400).json({ message: "Title and type are required" });
    }
    const group = await Group.create({ title, type, user: req.user!._id });
    console.log("✅ Group created:", group);
    res.status(201).json(group);
  } catch (error: any) {
    console.error("❌ Group create error:", error.message);
    res.status(500).json({ message: "Error creating group", error: error.message });
  }
});
export const deleteGroup = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const group = await Group.findOneAndDelete({ _id: id, user: req.user!._id });
  if (!group) return res.status(404).json({ message: "Group not found" });
  const lists = await List.find({ groupId: id, user: req.user!._id }).select("_id");
  const listIds = lists.map((l) => l._id);
  await List.deleteMany({ _id: { $in: listIds } });
  await Todo.deleteMany({
    $or: [{ groupId: id }, { listId: { $in: listIds } }],
    user: req.user!._id,
  });

  res.json({ message: "Group and related items deleted" });
});

export const updateGroup = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title } = req.body;
  const updated = await Group.findOneAndUpdate(
    { _id: id, user: req.user!._id },
    { $set: { title } },
    { new: true }
  );
  if (!updated) return res.status(404).json({ message: "Group not found" });
  res.json(updated);
});

export const getGroupById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const group = await Group.findOne({ _id: id, user: req.user!._id });
  if (!group) {
    return res.status(404).json({ message: "Group not found" });
  }

  res.json(group);
});

