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
			type: Number,
			required: true,
		},
		type: {
			type: String,
			required: true,
			enum: ["coin", "usd"],
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
