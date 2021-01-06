import { Router } from "express";
import CTransaction from "../controllers/transaction.controller";

const router = Router();

router.get("/", CTransaction.get);
router.post("/create", CTransaction.create);

export default router;
