import { Router } from "express";
import { protect } from "../middlewares/protect.middleware";
import {
	createGroup,
	deleteGroup,
	getGroups,
	updateGroup,
	getGroupById,
} from "../controllers/group.controller";
import { validate } from "../middlewares/validate.middleware";
import {
	createGroupSchema,
	paramIdSchema,
} from "../validators/group.validators";

const router = Router();

router.use(protect);

router.get("/", getGroups);
router.post("/", validate(createGroupSchema), createGroup);
router.patch("/:id", validate(paramIdSchema), updateGroup);
router.delete("/:id", validate(paramIdSchema), deleteGroup);
router.get("/:id", validate(paramIdSchema), getGroupById);

export default router;
