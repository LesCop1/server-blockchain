import mongoose from "mongoose";

const BlockchainSchema = new mongoose.Schema({
	blocks: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Block",
			required: true,
		},
	],
	currIndex: {
		type: Number,
		required: true,
	},
});

BlockchainSchema.pre("save", function (next) {
	try {
		const self = this;
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		if (!self.isModified("blocks")) return next();

		// @ts-ignore
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		self.currIndex = self.blocks.length;

		return next();
	} catch (err) {
		return next(err);
	}
});

const BlockchainModel = mongoose.model("Blockchain", BlockchainSchema);

export default BlockchainModel;
