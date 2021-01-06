import MPool from "../models/pool.model";
import IPool from "../interfaces/pool.interface";
import BlockEventEmitter from "../events/BlockEventEmitter";

export async function create(minersIDs: string[]): Promise<void> {
	const pool = <IPool>(<unknown>await new MPool({ miners: minersIDs }).save());
	BlockEventEmitter.emit("poolCreated", <string>pool._id);
}

export default {
	create,
};
