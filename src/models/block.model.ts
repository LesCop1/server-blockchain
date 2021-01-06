import mongoose from "mongoose";
import { numberOfController } from "../globals";

const BlockSchema = new mongoose.Schema(
	{
		index: {
			type: Number,
			required: true,
		},
		transactions: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Transaction",
				required: true,
			},
		],
		pools: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Pool",
				required: true,
			},
		],
		verifications: {
			type: [
				{
					controller: {
						type: mongoose.Schema.Types.ObjectId,
						ref: "User",
					},
					nonce: {
						type: Number,
					},
				},
			],
			default: [],
			validate: [arrayLimit, "{PATH} exceeds the limit."],
		},
		previousHash: {
			type: String,
			required: true,
		},
		hash: {
			type: String,
			required: true,
		},
		nonce: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true }
);

function arrayLimit(val: string | unknown[]) {
	return val.length <= numberOfController;
}

const BlockModel = mongoose.model("Block", BlockSchema);

export default BlockModel;
