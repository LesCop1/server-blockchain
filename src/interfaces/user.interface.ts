import DBDocument from "./dbdocument.interface";
import { Nationalities } from "../globals";

export default interface IUser extends DBDocument {
	firstname: string;
	lastname: string;
	nationality: Nationalities;
	birthDate: Date;
	email: string;
	password?: string;
	balance: number;
	stats: {
		connections: [
			{
				dateStart: Date;
				dateEnd?: Date;
				ip: string;
			}
		];
		numberOfMinedBlock: number;
		timeSpentMining: number;
	};
}
