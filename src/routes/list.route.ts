// import { Router } from "express";
// import {
//   getLists,
//   createList,
//   updateList,
//   deleteList,
// } from "../controllers/list.controller";


// const router = Router();

// router.get("/", getLists);
// router.post("/", createList);
// router.put("/:id", updateList);
// router.delete("/:id", deleteList);

// export default router;

import { Router } from "express";
import {
  getLists,
  createList,
  updateList,
  deleteList,
} from "../controllers/list.controller";
import { protect } from "../middlewares/auth.middleware";

const router = Router();

// Ab sari routes protected hain
router.get("/", protect, getLists);
router.post("/", protect, createList);
router.put("/:id", protect, updateList);
router.delete("/:id", protect, deleteList);

export default router;
