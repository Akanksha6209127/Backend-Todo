import { Router } from "express";
import { protect } from "../middlewares/auth.middleware";
import {
	createList,
	deleteList,
	getLists,
	renameList,
} from "../controllers/list.controller";
import { validate } from "../middlewares/validate.middleware";
import {
	createListSchema,
	updateListSchema,
} from "../validators/list.validators";

const router = Router();

router.use(protect);

router.get("/", getLists); // optional ?groupId=
router.post("/", validate(createListSchema), createList);
router.put("/:id", validate(updateListSchema, "params"), renameList);
router.delete("/:id", deleteList);

export default router;
