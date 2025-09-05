"use strict";
// import { List, IList } from "../models/list.model";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteListService = exports.updateListService = exports.createListService = exports.getListsService = void 0;
// export const getListsService = async (): Promise<IList[]> => {
//   return await List.find().sort({ createdAt: -1 });
// };
// export const createListService = async (name: string): Promise<IList> => {
//   return await List.create({ name });
// };
// export const updateListService = async (
//   id: string,
//   data: Partial<IList>
// ): Promise<IList | null> => {
//   return await List.findByIdAndUpdate(id, data, { new: true });
// };
// export const deleteListService = async (id: string): Promise<IList | null> => {
//   return await List.findByIdAndDelete(id);
// };
const list_model_1 = require("../models/list.model");
const getListsService = async (user) => {
    return await list_model_1.List.find({ user }).sort({ createdAt: -1 });
};
exports.getListsService = getListsService;
const createListService = async (data) => {
    return await list_model_1.List.create(data);
};
exports.createListService = createListService;
const updateListService = async (id, data, user) => {
    return await list_model_1.List.findOneAndUpdate({ _id: id, user }, data, { new: true });
};
exports.updateListService = updateListService;
const deleteListService = async (id, user) => {
    return await list_model_1.List.findOneAndDelete({ _id: id, user });
};
exports.deleteListService = deleteListService;
