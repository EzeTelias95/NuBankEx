"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TransactionEvaluator_1 = __importDefault(require("./TransactionEvaluator"));
class Authorizer {
    constructor() {
        this.account = null;
        this.transactionEvaluator = new TransactionEvaluator_1.default();
    }
    ;
    addAccount(account) {
        if (this.account) {
            return "account-already-initialized";
        }
        else {
            this.account = account;
        }
    }
    processTransaction(transaction) {
        let violations = this.transactionEvaluator.Evaluate(this.account, transaction);
        if (violations.length === 0) {
            this.account.addTransaction(transaction);
        }
        return { "account": this.account ? this.account.getStatus() : {}, "violations": violations };
    }
}
exports.default = Authorizer;
