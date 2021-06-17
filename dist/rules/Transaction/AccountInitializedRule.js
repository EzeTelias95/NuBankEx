"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const messages_1 = require("../../strings/messages");
class AccountInitializedRule {
    execute(account, transaction) {
        if (account) {
            return true;
        }
        return false;
    }
    violationMessage() {
        return messages_1.ACCOUNT_NOT_INITIALIZED;
    }
}
exports.default = AccountInitializedRule;
