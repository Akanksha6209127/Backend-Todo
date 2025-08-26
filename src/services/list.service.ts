import { List, IList } from "../models/list.model";

export const getListsService = async (): Promise<IList[]> => {
  return await List.find().sort({ createdAt: -1 });
};

export const createListService = async (name: string): Promise<IList> => {
  return await List.create({ name });
};

export const updateListService = async (
  id: string,
  data: Partial<IList>
): Promise<IList | null> => {
  return await List.findByIdAndUpdate(id, data, { new: true });
};

export const deleteListService = async (id: string): Promise<IList | null> => {
  return await List.findByIdAndDelete(id);
};
