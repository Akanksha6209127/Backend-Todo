

import Group  from "../models/group.model";

export const listGroups = (userId: string) => Group.find({ user: userId }).sort({ createdAt: -1 });

export const createGroup = (userId: string, title: string, type: "todo" | "list") =>
  Group.create({ title, type, user: userId });

export const deleteGroup = (userId: string, id: string) =>
  Group.findOneAndDelete({ _id: id, user: userId });
