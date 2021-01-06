// @ts-nocheck
import WebSocket from "ws";

let dataInterval: NodeJS.Timeout;
const avgVal = 2;

function setHandlers(wss: WebSocket.Server): void {
	const pingInterval = setInterval(() => {
		wss.clients.forEach((ws) => {
			if (ws.isAlive === false) return ws.close();

			ws.isAlive = false;
			ws.ping();
		});
	}, 30000);

	wss.on("connection", (ws) => {
		ws.isAlive = true;
		ws.on("pong", () => {
			this.isAlive = true;
		});

		if (!dataInterval && wss.clients.size > 0) {
			dataInterval = setInterval(() => {
				const val = avgVal + Math.random() * 5 - 2.5;

				wss.clients.forEach((ws1) => {
					ws1.send(val);
				});
			}, 2000);
		}

		ws.on("close", () => {
			if (wss.clients.size == 0 && dataInterval) {
				clearInterval(dataInterval);
				dataInterval = null;
			}
		});
	});

	wss.on("close", () => {
		if (dataInterval) clearInterval(dataInterval);
		clearInterval(pingInterval);
	});
}

export default { setHandlers };
