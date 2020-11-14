import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
	{
		from: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		to: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		amount: {
			type: [Number],
			required: true,
			default: [],
		},
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		block: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Block",
		},
	},
	{ timestamps: true }
);

const TransactionModel = mongoose.model("Transaction", TransactionSchema);

export default TransactionModel;
