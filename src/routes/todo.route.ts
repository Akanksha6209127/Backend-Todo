// import { Router } from "express";
// import {
//   getTodos,
//   createTodo,
//   updateTodo,
//   deleteTodo,
// } from "../controllers/todo.controller";

// const router = Router();

// router.get("/", getTodos);          
// router.post("/", createTodo);       
// router.put("/:id", updateTodo);     
// router.delete("/:id", deleteTodo);  

// export default router;


import { Router } from "express";
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todo.controller";
import { protect } from "../middlewares/auth.middleware";  // import protect

const router = Router();

// Protect all routes
router.get("/", protect, getTodos);
router.post("/", protect, createTodo);
router.put("/:id", protect, updateTodo);
router.delete("/:id", protect, deleteTodo);

export default router;

