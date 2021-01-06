import { Router } from "express";
import CUser from "../controllers/user.controller";

const router = Router();

router.get("/dashboard", CUser.getDashboard);
router.get("/search", CUser.getUserByEmail);
router.get("/settings");

export default router;
