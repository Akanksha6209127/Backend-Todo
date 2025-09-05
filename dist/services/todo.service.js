"use strict";
// import { Todo } from "../models/todo.model";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodoService = exports.updateTodoService = exports.createTodoService = exports.getTodosService = void 0;
// export const getTodosService = async () => {
//   return await Todo.find();
// };
// export const createTodoService = async (data: {
//   title: string;
//   amount: number;
//   unit: string;
// }) => {
//   return await Todo.create(data);
// };
// export const updateTodoService = async (id: string, data: any) => {
//   return await Todo.findByIdAndUpdate(id, data, { new: true });
// };
// export const deleteTodoService = async (id: string) => {
//   return await Todo.findByIdAndDelete(id);
// };
// src/services/todo.service.ts
const todo_model_1 = require("../models/todo.model");
const getTodosService = async (user) => {
    return await todo_model_1.Todo.find({ user }); // sirf us user ke todos return karega
};
exports.getTodosService = getTodosService;
const createTodoService = async (data) => {
    return await todo_model_1.Todo.create(data);
};
exports.createTodoService = createTodoService;
const updateTodoService = async (id, data) => {
    return await todo_model_1.Todo.findByIdAndUpdate(id, data, { new: true });
};
exports.updateTodoService = updateTodoService;
const deleteTodoService = async (id) => {
    return await todo_model_1.Todo.findByIdAndDelete(id);
};
exports.deleteTodoService = deleteTodoService;
