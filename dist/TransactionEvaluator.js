"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AccountInitializedRule_1 = __importDefault(require("./rules/transaction/AccountInitializedRule"));
const CardNotActiveRule_1 = __importDefault(require("./rules/transaction/CardNotActiveRule"));
const DoubledTransactionRule_1 = __importDefault(require("./rules/transaction/DoubledTransactionRule"));
const HighFreqSIntervalRule_1 = __importDefault(require("./rules/transaction/HighFreqSIntervalRule"));
const InsufficientLimitRule_1 = __importDefault(require("./rules/transaction/InsufficientLimitRule"));
class TransactionEvaluator {
    constructor() {
        this._rules = [];
        this._rules.push(new AccountInitializedRule_1.default);
        this._rules.push(new InsufficientLimitRule_1.default);
        this._rules.push(new CardNotActiveRule_1.default);
        this._rules.push(new HighFreqSIntervalRule_1.default);
        this._rules.push(new DoubledTransactionRule_1.default);
    }
    Evaluate(account, transaction) {
        let violations = [];
        this._rules.forEach(rule => {
            if (!rule.execute(account, transaction))
                violations.push(rule.violationMessage());
        });
        return violations;
    }
}
exports.default = TransactionEvaluator;
