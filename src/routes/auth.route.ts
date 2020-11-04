import { Router } from "express";
import CAuth from "../controllers/auth.controller";
import guard from "../utils/guard";

const router = Router();

router.post("/signup", CAuth.signup);
router.post("/signin", guard.authHandler, CAuth.signin);
router.post("/signout", guard.signout, CAuth.signout);

export default router;
