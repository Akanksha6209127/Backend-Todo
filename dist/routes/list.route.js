"use strict";
// import { Router } from "express";
// import {
//   getLists,
//   createList,
//   updateList,
//   deleteList,
// } from "../controllers/list.controller";
Object.defineProperty(exports, "__esModule", { value: true });
// const router = Router();
// router.get("/", getLists);
// router.post("/", createList);
// router.put("/:id", updateList);
// router.delete("/:id", deleteList);
// export default router;
const express_1 = require("express");
const list_controller_1 = require("../controllers/list.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
// Ab sari routes protected hain
router.get("/", auth_middleware_1.protect, list_controller_1.getLists);
router.post("/", auth_middleware_1.protect, list_controller_1.createList);
router.put("/:id", auth_middleware_1.protect, list_controller_1.updateList);
router.delete("/:id", auth_middleware_1.protect, list_controller_1.deleteList);
exports.default = router;
