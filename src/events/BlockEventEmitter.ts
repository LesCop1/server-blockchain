import { EventEmitter } from "events";
import TypedEventEmitter from "./index";
import IBlock from "../interfaces/block.interface";
import SBlock from "../services/block.service";
import SBlockchain from "../services/blockchain.service";

interface BlockEvents {
	transactionCreated: (transactionID: string) => void;
	poolCreated: (poolID: string) => void;
	notifyPoolToMine: (block: IBlock, selectedPool: string) => void;
	poolHasVerified: (minerID: string, minerNonce: number) => void;
	ongoingBlockMined: () => void;
}

const BlockEventEmitter = new EventEmitter() as TypedEventEmitter<BlockEvents>;

const pendingTransactions: string[] = [];
const pendingPools: string[] = [];
let ongoingBlock: IBlock | null = null;

BlockEventEmitter.addListener("poolCreated", async (poolID) => {
	pendingPools.push(poolID);
	pendingPools.sort(() => {
		return 0.5 - Math.random();
	});

	await tryToCreateBlock();
});
BlockEventEmitter.addListener("transactionCreated", async (poolID) => {
	pendingPools.push(poolID);
	pendingPools.sort(() => {
		return 0.5 - Math.random();
	});

	await tryToCreateBlock();
});

BlockEventEmitter.addListener("poolHasVerified", (minerID, minerNonce) => {
	ongoingBlock!.verifications.push({ controller: minerID, nonce: minerNonce });
	if (ongoingBlock!.verifications.length === Number(process.env.BLOCK_MAX_VERIFICATIONS)) {
		BlockEventEmitter.emit("ongoingBlockMined");
	} else {
		assignPoolToOngoingBlock();
	}
});
BlockEventEmitter.addListener("ongoingBlockMined", async () => {
	const { hash, nonce } = isCorrectBlock();
	if (hash) {
		const { index, transactions, pools, verifications, previousHash } = ongoingBlock!;
		const { _id: newBlockID } = await SBlock.create(
			index,
			transactions,
			pools,
			verifications,
			previousHash,
			hash,
			nonce!
		);
		await SBlockchain.addToBlockchain(newBlockID!);
		ongoingBlock = null;

		await tryToCreateBlock();
	} else {
		resetOngoingBlock();

		assignPoolToOngoingBlock();
	}
});

async function tryToCreateBlock() {
	if (!ongoingBlock && pendingTransactions.length >= Number(process.env.TRANSACTIONS_PER_BLOCK)) {
		const { index: prevIndex, hash: prevHash } = await SBlockchain.getLastBlock();

		const selectedPool = pendingPools.splice(0, 1)[0];
		ongoingBlock = {
			index: prevIndex + 1,
			transactions: pendingTransactions.splice(0, Number(process.env.TRANSACTIONS_PER_BLOCK)),
			pools: [selectedPool],
			verifications: [],
			previousHash: prevHash!,
			hash: "",
		};

		BlockEventEmitter.emit("notifyPoolToMine", ongoingBlock, selectedPool);
	}
}

function assignPoolToOngoingBlock() {
	pendingPools.sort(() => {
		return 0.5 - Math.random();
	});
	const selectedPool = pendingPools.splice(0, 1)[0];
	ongoingBlock!.pools.push(selectedPool);

	BlockEventEmitter.emit("notifyPoolToMine", ongoingBlock!, selectedPool);
}

function isCorrectBlock(): { hash: string | null; nonce: number | null } {
	// TODO
	// 2 out of 3 have the same nonce, and this nonce make good result, block data (pool, hash, prevHash) is not null returns then has.
	// if there's error somewhere, returns null';
	// Also punish miners.
	return { hash: null, nonce: null };
}

function resetOngoingBlock() {
	ongoingBlock!.pools = [];
	ongoingBlock!.verifications = [];
}

export default BlockEventEmitter;
