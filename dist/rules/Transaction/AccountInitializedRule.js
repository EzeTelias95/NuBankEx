"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AccountInitializedRule {
    execute(account, transaction) {
        if (account) {
            return true;
        }
        return false;
    }
    violationMessage() {
        return 'account-not-initialized';
    }
}
exports.default = AccountInitializedRule;
