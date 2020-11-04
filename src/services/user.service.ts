import MUser from "../models/user.model";
import IUser from "../interfaces/user.interface";
import { Nationalities } from "../globals";

export async function create(
	firstname: string,
	lastname: string,
	nationality: Nationalities,
	birthDate: Date,
	email: string,
	password: string
): Promise<IUser> {
	return <IUser>(<unknown>await new MUser({
		firstname,
		lastname,
		nationality,
		birthDate,
		email,
		password,
	}).save());
}

export async function exists(
	firstname: string,
	lastname: string,
	nationality: Nationalities,
	birthDate: Date,
	email: string
): Promise<boolean> {
	const user = await MUser.findOne({
		firstname,
		lastname,
		nationality,
		birthDate,
		email,
	}).lean();

	return !!user;
}

export async function getById(id: string): Promise<IUser | null> {
	return MUser.findById(id).lean();
}

export async function getByEmail(email: string): Promise<IUser | null> {
	return MUser.findOne({ email: email }).lean();
}

export async function isValidPassword(id: string, password: string): Promise<boolean> {
	const user = await MUser.findById(id);
	if (!user) throw new Error();

	// @ts-ignore
	return user.isValidPassword(password);
}

export default {
	create,
	exists,
	getById,
	getByEmail,
	isValidPassword,
};
