import { EventEmitter } from "events";
import TypedEventEmitter from "./index";

interface BlockchainEvents {
	transactionCreated: (transactionID: string) => void;
}

const BlockchainEventEmitter = new EventEmitter() as TypedEventEmitter<BlockchainEvents>;

export default BlockchainEventEmitter;
