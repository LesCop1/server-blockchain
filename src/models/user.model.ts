import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { Nationalities } from "../globals";

//TODO : Index nom prenom nationalité ; email
const UserSchema = new mongoose.Schema(
	{
		firstname: {
			type: String,
			required: true,
		},
		lastname: {
			type: String,
			required: true,
		},
		nationality: {
			type: String,
			required: true,
			enum: Object.values(Nationalities),
		},
		birthDate: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
		},
		balance: {
			EC: {
				type: Number,
				required: true,
				default: 0,
			},
			USD: {
				type: Number,
				required: true,
				default: 0,
			},
		},
		history: [
			{
				type: String,
				date: String,
				description: [String],
				value: [String],
			},
		],
		stats: {
			connections: [
				// TODO : Fix a maximum length or date.
				{
					dateStart: {
						type: Date,
						required: true,
					},
					dateEnd: {
						type: Date,
					},
					ip: {
						type: String,
						required: true,
					},
				},
			],
			numberOfMinedBlock: {
				type: Number,
				required: true,
				default: 0,
			},
			timeSpentMining: {
				type: Number,
				required: true,
				default: 0,
			},
		},
	},
	{ timestamps: true }
);

UserSchema.pre("save", async function (next) {
	try {
		const self = this;
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		if (!self.isModified("password")) return next();

		const salt = await bcrypt.genSalt(10);

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		self.password = await bcrypt.hash(self.password, salt);

		return next();
	} catch (err) {
		return next(err);
	}
});

UserSchema.methods.isValidPassword = async function (newPassword: string) {
	try {
		return await bcrypt.compare(newPassword, this.password);
	} catch (e) {
		throw new Error(e);
	}
};

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
