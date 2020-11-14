import DBDocument from "./dbdocument.interface";
import IBlock from "./block.interface";

export default interface IBlockchain extends DBDocument {
	blocks: IBlock[];
	currIndex: number;
}
