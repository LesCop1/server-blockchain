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
		pool: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Pool",
			required: true,
		},
		verification: {
			type: [
				{
					controller: {
						type: mongoose.Schema.Types.ObjectId,
						ref: "User",
					},
					result: {
						type: Boolean,
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
	},
	{ timestamps: true }
);

function arrayLimit(val: string | unknown[]) {
	return val.length <= numberOfController;
}

const BlockModel = mongoose.model("Block", BlockSchema);

export default BlockModel;
