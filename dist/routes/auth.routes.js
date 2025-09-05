"use strict";
// import { Router } from "express";
// import { registerUser, loginUser, getMe } from "../controllers/auth.controller";
// import { protect } from "../middlewares/auth.middleware";
Object.defineProperty(exports, "__esModule", { value: true });
// const router = Router();
// router.post("/signup", registerUser);
// router.post("/signin", loginUser);
// router.get("/me", protect, getMe);
// export default router;
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
// ✅ make sure the path matches your actual folder name
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.post("/signup", auth_controller_1.registerUser);
router.post("/signin", auth_controller_1.loginUser);
router.get("/me", auth_middleware_1.protect, auth_controller_1.getMe);
exports.default = router;
