import { Router } from "express";
import { registerUser, loginUser, getMe } from "../controllers/auth.controller";
import { protect } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import { signinSchema, signupSchema } from "../validators/auth.validators";

const router = Router();

router.post("/signup", validate(signupSchema), registerUser);
router.post("/signin", validate(signinSchema), loginUser);
router.get("/me", protect, getMe);

export default router;
