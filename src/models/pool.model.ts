import mongoose from "mongoose";
import { PoolTypes } from "../globals";

const PoolSchema = new mongoose.Schema(
	{
		miners: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
				required: true,
			},
		],
		type: {
			type: String,
			enum: Object.values(PoolTypes),
			required: true,
		},
	},
	{ timestamps: true }
);

const PoolModel = mongoose.model("Pool", PoolSchema);

export default PoolModel;
