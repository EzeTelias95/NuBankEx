"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
class DoubledTransactionRule {
    execute(account, transaction) {
        let newDate = new Date(transaction.time);
        newDate.setMinutes(newDate.getMinutes() - 2);
        let doubledTransactions = lodash_1.default.filter(account.getTransactionsFromDate(newDate), (oldTransaction) => oldTransaction.merchant === transaction.merchant && oldTransaction.amount === transaction.amount);
        if (doubledTransactions.length === 0) {
            return true;
        }
        return false;
    }
    violationMessage() {
        return 'doubled-transaction';
    }
}
exports.default = DoubledTransactionRule;
