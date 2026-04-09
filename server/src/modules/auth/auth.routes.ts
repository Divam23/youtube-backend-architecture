import { Router } from "express";
import { registerUser } from "./auth.service";

const router = Router();

router.route("/register").post(registerUser)
router.route

export default router;