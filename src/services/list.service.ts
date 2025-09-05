import  List  from "../models/list.model";

export const listLists = (userId: string, groupId: string) =>
  List.find({ user: userId, groupId }).sort({ createdAt: -1 });

export const createList = (userId: string, name: string, groupId: string) =>
  List.create({ user: userId, name, groupId });

export const updateList = (userId: string, id: string, name?: string) =>
  List.findOneAndUpdate({ _id: id, user: userId }, { name }, { new: true });

export const deleteList = (userId: string, id: string) =>
  List.findOneAndDelete({ _id: id, user: userId });
