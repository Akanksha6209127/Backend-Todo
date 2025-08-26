import { Router } from "express";
import {
  getLists,
  createList,
  updateList,
  deleteList,
} from "../controllers/list.controller";

const router = Router();

router.get("/", getLists);
router.post("/", createList);
router.put("/:id", updateList);
router.delete("/:id", deleteList);

export default router;
