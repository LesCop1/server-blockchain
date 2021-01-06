import MBlock from "../models/block.model";
import IBlock from "../interfaces/block.interface";

async function create(
	index: number,
	transactions: any[],
	pools: string[],
	verifications: any[],
	previousHash: string,
	hash: string,
	nonce: number
): Promise<IBlock> {
	return <IBlock>(<unknown>await new MBlock({
		index,
		transactions,
		pools,
		verifications,
		previousHash,
		hash,
		nonce,
	}).save());
}

export default {
	create,
};
