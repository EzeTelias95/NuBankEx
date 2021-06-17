"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const messages_1 = require("../../strings/messages");
class InsufficientLimitRule {
    execute(account, transaction) {
        if (account && transaction.amount > account.availableLimit) {
            return false;
        }
        return true;
    }
    violationMessage() {
        return messages_1.INSUFFICIENT_LIMIT;
    }
}
exports.default = InsufficientLimitRule;
