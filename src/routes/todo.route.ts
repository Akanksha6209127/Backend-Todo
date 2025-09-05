import { Router } from "express";
import { protect } from "../middlewares/auth.middleware";
import { createTodo, deleteTodo, getTodos, updateTodo } from "../controllers/todo.controller";
import { validate } from "../middlewares/validate.middleware";
import { createTodoSchema, updateTodoSchema } from "../validators/todo.validators";

const router = Router();

router.use(protect);

router.get("/", getTodos); // ?listId= OR ?groupId=
router.post("/", validate(createTodoSchema), createTodo);
router.put("/:id", validate(updateTodoSchema), updateTodo);
router.delete("/:id", deleteTodo);

export default router;
