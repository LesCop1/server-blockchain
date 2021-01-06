import MBlockchain from "../models/blockchain.model";
import IBlock from "../interfaces/block.interface";

async function addToBlockchain(blockID: string): Promise<void> {
	const id = await getId();
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	await MBlockchain.updateOne({ _id: id }, { $push: { blocks: blockID } });
}

async function getLastBlock(): Promise<IBlock> {
	const id = await getId();

	// @ts-ignore
	const block = await MBlockchain.findOne({ _id: id }, { blocks: { $slice: -1 }, _id: 0 }).populate("blocks");

	// @ts-ignore
	return block;
}

async function getId(): Promise<string> {
	// @ts-ignore
	const { _id } = await MBlockchain.findOne({});

	return _id;
}

export default {
	addToBlockchain,
	getLastBlock,
	getId,
};
