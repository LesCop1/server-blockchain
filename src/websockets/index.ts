import WebSocket from "ws";
import http from "http";
import url from "url";
import logger from "../logger";
import currentValueWS from "../websockets/currentValueWS";
import minningWS from "./minningWS";

let isInit = false;
let wsCurrValueServer: WebSocket.Server;
let wsMinningServer: WebSocket.Server;

function init(server: http.Server): void {
	logger.log("info", "Creating WebSocket servers...");
	wsCurrValueServer = new WebSocket.Server({ noServer: true });
	wsMinningServer = new WebSocket.Server({ noServer: true });

	server.on("upgrade", (req, socket, head) => {
		const path = url.parse(req.url).pathname;
		if (req.isAuthenticated()) {
			if (path == "/dashboard") {
				wsCurrValueServer.handleUpgrade(req, socket, head, (ws) => {
					wsCurrValueServer.emit("connection", ws, req);
				});
			} else if (path == "/mine") {
				wsMinningServer.handleUpgrade(req, socket, head, (ws) => {
					wsMinningServer.emit("connection", ws, req);
				});
			} else {
				socket.destroy();
			}
		} else {
			socket.destroy();
		}
	});
	currentValueWS.setHandlers(wsCurrValueServer);
	minningWS.setHandlers(wsMinningServer);
	isInit = true;
}

function on(ws: "currValue" | "minning", event: string, cb: () => any): void {
	if (isInit) {
		if (ws === "currValue") {
			wsCurrValueServer.on(event, cb);
		} else if (ws === "minning") {
			wsMinningServer.on(event, cb);
		}
	} else {
		logger.log("error", "WS must be initialized before calling .on");
	}
}

function emit(ws: "currValue" | "minning", event: string, ...args: any[]): boolean {
	if (isInit) {
		if (ws === "currValue") {
			return wsCurrValueServer.emit(event, args);
		} else if (ws === "minning") {
			return wsMinningServer.emit(event, args);
		}
	} else {
		logger.log("error", "WS must be initialized before calling .on");
	}
	return false;
}

function get(ws: "currValue" | "minning"): WebSocket.Server | null {
	if (ws === "currValue") {
		return wsCurrValueServer;
	} else if (ws === "minning") {
		return wsMinningServer;
	}
	return null;
}

export default { init, on, emit, get };
