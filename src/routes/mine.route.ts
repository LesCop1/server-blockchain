import { Router } from "express";
import PoolEventEmitter from "../events/PoolEventEmitter";

const router = Router();

router.get("/"); // Returns number of transaction to wait / How much per transaction minned / Avg time / how much pools are waiting /

router.post("/join/:id", (req, res) => {
	PoolEventEmitter.emit("minerJoined", req.params.id);
	res.send({ data: "sent" });
});

router.post("/leave/:id", (req, res) => {
	PoolEventEmitter.emit("minerLeft", req.params.id);
	res.send({ data: "sent" });
});

export default router;
