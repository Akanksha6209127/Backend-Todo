// import { Todo } from "../models/todo.model";

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
import { Todo } from "../models/todo.model";

export const getTodosService = async (userId: string) => {
  return await Todo.find({ userId }); // sirf us user ke todos return karega
};

export const createTodoService = async (data: {
  title: string;
  amount: number;
  unit: string;
  userId: string;
}) => {
  return await Todo.create(data);
};

export const updateTodoService = async (id: string, data: any) => {
  return await Todo.findByIdAndUpdate(id, data, { new: true });
};

export const deleteTodoService = async (id: string) => {
  return await Todo.findByIdAndDelete(id);
};

