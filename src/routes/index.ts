import { Router } from "express";
import RAuth from "../routes/auth.route";
import RUser from "../routes/user.route";

const router = Router();

router.use("/auth", RAuth);
router.use("/user", RUser);

export default router;
