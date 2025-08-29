

import { List, IList } from "../models/list.model";


export const getListsService = async (user: string): Promise<IList[]> => {
  return await List.find({ user }).sort({ createdAt: -1 });
};


export const createListService = async (data: { name: string; user: string }): Promise<IList> => {
  return await List.create(data);
};


export const updateListService = async ( 
  id: string,
  data: Partial<IList>,
  user: string
): Promise<IList | null> => {
  return await List.findOneAndUpdate({ _id: id, user }, data, { new: true });
};


export const deleteListService = async (id: string, user: string): Promise<IList | null> => {
  return await List.findOneAndDelete({ _id: id, user });
};
