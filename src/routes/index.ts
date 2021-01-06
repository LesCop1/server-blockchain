import { Router } from "express";
import guard from "../utils/guard";
import RAuth from "../routes/auth.route";
import RUser from "../routes/user.route";
import RTransaction from "../routes/transaction.route";
import RMine from "../routes/mine.route";

const router = Router();

router.use("/auth", RAuth);
router.use("/user", guard.isAuth, RUser);
router.use("/transaction", guard.isAuth, RTransaction);
router.use("/mine", RMine);

export default router;
