import { EventEmitter } from "events";
import TypedEventEmitter from "./index";
import sleep from "../utils/sleep";
import { create } from "../services/pool.service";

interface PoolEvents {
	minerJoined: (minerID: string) => void;
	minerLeft: (minerID: string) => void;
	poolUpdated: () => void;
	timerBegins: (minersIDs: string[]) => void;
	timerCountdowns: (minersIDs: string[], countdown: number) => void;
	minerForceQuit: (minerID: string) => void;
}

const PoolEventEmitter = new EventEmitter() as TypedEventEmitter<PoolEvents>;

let pendingMiners: string[] = [];
let selectedMiners: string[] = [];

PoolEventEmitter.addListener("minerJoined", (minerID) => {
	pendingMiners.push(minerID);
	pendingMiners.sort(() => {
		return 0.5 - Math.random();
	});
	if (pendingMiners.length >= Number(process.env.POOL_SIZE)) {
		const newSelectedMiners = pendingMiners.splice(0, Number(process.env.POOL_SIZE));
		selectedMiners.push(...newSelectedMiners);
		PoolEventEmitter.emit("timerBegins", newSelectedMiners);
	}
	PoolEventEmitter.emit("poolUpdated");
});
PoolEventEmitter.addListener("minerLeft", (minerID) => {
	pendingMiners = pendingMiners.filter((id) => {
		return id != minerID;
	});
	selectedMiners = selectedMiners.filter((id) => {
		return id != minerID;
	});
	PoolEventEmitter.emit("poolUpdated");
});

PoolEventEmitter.addListener("timerBegins", (minersIDs) => {
	PoolEventEmitter.emit("timerCountdowns", minersIDs, 5);
});
PoolEventEmitter.addListener("timerCountdowns", async (minersIDs, countdown) => {
	const actualMiners = selectedMiners.filter((ID) => {
		return minersIDs.indexOf(ID) !== -1;
	});

	if (actualMiners.length === minersIDs.length) {
		if (countdown === 0) {
			await create(minersIDs);
			selectedMiners = selectedMiners.filter((ID) => {
				return minersIDs.indexOf(ID) === -1;
			});
		} else {
			await sleep(1000);
			PoolEventEmitter.emit("timerCountdowns", minersIDs, --countdown);
		}
	} else {
		pendingMiners.push(...actualMiners);
	}
});

PoolEventEmitter.addListener("minerForceQuit", (minerID) => {
	const inPendingCompetitive = pendingMiners.some((ID) => {
		return minerID === ID;
	});
	const inSelectedCompetitive = selectedMiners.some((ID) => {
		return minerID === ID;
	});
	if (inPendingCompetitive || inSelectedCompetitive) {
		PoolEventEmitter.emit("minerLeft", minerID);
		return;
	}
});

export default PoolEventEmitter;
