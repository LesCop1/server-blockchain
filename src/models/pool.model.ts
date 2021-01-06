import mongoose from "mongoose";

const PoolSchema = new mongoose.Schema(
	{
		miners: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
				required: true,
			},
		],
	},
	{ timestamps: true }
);

const PoolModel = mongoose.model("Pool", PoolSchema);

export default PoolModel;
