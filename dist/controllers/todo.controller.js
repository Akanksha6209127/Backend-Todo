"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.createTodo = exports.getTodos = void 0;
const todo_service_1 = require("../services/todo.service");
const getTodos = async (req, res) => {
    try {
        const todos = await (0, todo_service_1.getTodosService)(req.user?._id); // 👈 user pass karo
        res.json(todos);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch todos" });
    }
};
exports.getTodos = getTodos;
const createTodo = async (req, res) => {
    try {
        const { title, amount, unit } = req.body;
        const user = req.user?._id; // 👈 safe check
        if (!user) {
            return res.status(401).json({ message: "Not authorized" });
        }
        const todo = await (0, todo_service_1.createTodoService)({ title, user, amount, unit });
        res.status(201).json(todo);
    }
    catch (error) {
        res.status(400).json({ message: "Failed to create todo" });
    }
};
exports.createTodo = createTodo;
const updateTodo = async (req, res) => {
    try {
        const todo = await (0, todo_service_1.updateTodoService)(req.params.id, req.body);
        if (!todo)
            return res.status(404).json({ message: "Todo not found" });
        res.json(todo);
    }
    catch (error) {
        res.status(400).json({ message: "Failed to update todo" });
    }
};
exports.updateTodo = updateTodo;
const deleteTodo = async (req, res) => {
    try {
        const todo = await (0, todo_service_1.deleteTodoService)(req.params.id);
        if (!todo)
            return res.status(404).json({ message: "Todo not found" });
        res.json({ message: "Todo deleted" });
    }
    catch (error) {
        res.status(400).json({ message: "Failed to delete todo" });
    }
};
exports.deleteTodo = deleteTodo;
