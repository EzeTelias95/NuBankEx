"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
class Account {
    constructor(activeCard, availableLimit) {
        this.activeCard = activeCard;
        this.availableLimit = availableLimit;
        this.lastTransactionTime = null;
        this.transactions = new Array();
    }
    addTransaction(transaction) {
        this.availableLimit = this.availableLimit - transaction.amount;
        this.transactions.push(transaction);
    }
    getStatus() {
        return { "active-card": this.activeCard, "available-limit": this.availableLimit };
    }
    getTransactionsFromDate(date) {
        return lodash_1.default.filter(this.transactions, (transaction) => transaction.time > date);
    }
}
exports.default = Account;
