import MTransaction from "../models/transaction.model";
import ITransaction from "../interfaces/transaction.interface";

async function create(from: string, to: string, type: "coin" | "usd", amount: number): Promise<ITransaction> {
	return <ITransaction>(<unknown>await new MTransaction({
		from: from,
		to: to,
		amount: amount,
		type: type,
	}).save());
}

async function getTransactionsIdsWithoutBlocks(): Promise<string[]> {
	return <Promise<string[]>>(<unknown>MTransaction.find({ block: { $exists: false } }, "_id"));
}

export default {
	create,
	getTransactionsIdsWithoutBlocks,
};
