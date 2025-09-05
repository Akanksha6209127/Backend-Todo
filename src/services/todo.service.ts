import  Todo from "../models/todo.model";

export const listTodos = (userId: string, groupId: string) =>
  Todo.find({ user: userId, groupId }).sort({ createdAt: -1 });

export const createTodo = (userId: string, title: string, amount: number | undefined, unit: string | undefined, groupId: string) =>
  Todo.create({ user: userId, title, amount, unit, groupId });

export const updateTodo = (userId: string, id: string, data: Partial<{ title: string; amount: number; unit: string; completed: boolean }>) =>
  Todo.findOneAndUpdate({ _id: id, user: userId }, data, { new: true });

export const deleteTodo = (userId: string, id: string) =>
  Todo.findOneAndDelete({ _id: id, user: userId });
