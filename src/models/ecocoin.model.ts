import mongoose from "mongoose";

const EcoCoinSchema = new mongoose.Schema(
	{
		blockchain: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Blockchain",
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		history: [
			{
				price: {
					type: Number,
					required: true,
				},
				timestamp: {
					type: String,
					required: true,
				},
			},
		],
		availableCoin: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true }
);

const EcoCoinModel = mongoose.model("EcoCoin", EcoCoinSchema);

export default EcoCoinModel;
