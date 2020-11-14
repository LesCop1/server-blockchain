import DBDocument from "./dbdocument.interface";
import IBlockchain from "./blockchain.interface";

export default interface IEcoCoin extends DBDocument {
	blockchain: IBlockchain;
	price: number;
	history: [
		{
			price: number;
			timestamp: Date;
		}
	];
	availableCoin: number;
}
