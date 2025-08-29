// import { Router } from "express";
// import { registerUser, loginUser, getMe } from "../controllers/auth.controller";
// import { protect } from "../middlewares/auth.middleware";

// const router = Router();

// router.post("/signup", registerUser);
// router.post("/signin", loginUser);
// router.get("/me", protect, getMe);

// export default router;


import { Router } from "express";
import { registerUser, loginUser, getMe } from "../controllers/auth.controller";
// ✅ make sure the path matches your actual folder name
import { protect } from "../middlewares/auth.middleware";

const router = Router();

router.post("/signup", registerUser);
router.post("/signin", loginUser);
router.get("/me", protect, getMe);

export default router;
