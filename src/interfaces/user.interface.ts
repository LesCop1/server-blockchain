import DBDocument from "./dbdocument.interface";
import { Nationalities } from "../globals";

export default interface IUser extends DBDocument {
	firstname: string;
	lastname: string;
	nationality: Nationalities;
	birthDate: string | Date;
	email: string;
	password?: string;
	balance: {
		EC: number;
		USD: number;
	};
	history: [
		{
			type: "transfer" | "mining";
			date: string;
			description: string[];
			value: string[];
		}
	];
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
