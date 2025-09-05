"use strict";
// import { Router } from "express";
// import {
//   getTodos,
//   createTodo,
//   updateTodo,
//   deleteTodo,
// } from "../controllers/todo.controller";
Object.defineProperty(exports, "__esModule", { value: true });
// const router = Router();
// router.get("/", getTodos);          
// router.post("/", createTodo);       
// router.put("/:id", updateTodo);     
// router.delete("/:id", deleteTodo);  
// export default router;
const express_1 = require("express");
const todo_controller_1 = require("../controllers/todo.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware"); // import protect
const router = (0, express_1.Router)();
// Protect all routes
router.get("/", auth_middleware_1.protect, todo_controller_1.getTodos);
router.post("/", auth_middleware_1.protect, todo_controller_1.createTodo);
router.put("/:id", auth_middleware_1.protect, todo_controller_1.updateTodo);
router.delete("/:id", auth_middleware_1.protect, todo_controller_1.deleteTodo);
exports.default = router;
