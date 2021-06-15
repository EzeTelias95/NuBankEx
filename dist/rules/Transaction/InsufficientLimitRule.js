"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InsufficientLimitRule {
    execute(account, transaction) {
        if (transaction.amount > account.availableLimit) {
            return false;
        }
        return true;
    }
    violationMessage() {
        return 'insufficient-limit';
    }
}
exports.default = InsufficientLimitRule;
