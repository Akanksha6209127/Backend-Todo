import { Router } from "express";
import authRoutes from "./auth.routes";
import groupRoutes from "./group.routes";
import listRoutes from "./list.route";
import todoRoutes from "./todo.route";

const router = Router();

router.use("/auth", authRoutes);
router.use("/groups", groupRoutes);
router.use("/lists", listRoutes);
router.use("/todos", todoRoutes);

export default router;
