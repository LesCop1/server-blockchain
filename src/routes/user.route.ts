import { Router } from "express";
import CUser from "../controllers/user.controller";

const router = Router();

router.get("/", CUser.getSelf);

export default router;
