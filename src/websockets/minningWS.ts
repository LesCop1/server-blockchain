// @ts-nocheck
import WebSocket from "ws";
import PoolEventEmitter from "../events/PoolEventEmitter";

function setHandlers(wss: WebSocket.Server): void {
	const pingInterval = setInterval(() => {
		wss.clients.forEach((ws) => {
			if (ws.isAlive === false) {
				PoolEventEmitter.emit("minerForceQuit", ws.id);
				return ws.close();
			}

			ws.isAlive = false;
			ws.ping();
		});
	}, 2500);

	wss.on("connection", (ws, req) => {
		ws.isAlive = true;
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		ws.id = req.user._id;
		ws.on("pong", () => {
			ws.isAlive = true;
		});
	});

	wss.on("close", () => {
		clearInterval(pingInterval);
	});
}

export default { setHandlers };
