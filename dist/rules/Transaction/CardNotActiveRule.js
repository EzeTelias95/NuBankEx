"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CardNotActiveRule {
    execute(account, transaction) {
        if (account && !account.activeCard) {
            return false;
        }
        return true;
    }
    violationMessage() {
        return 'card-not-active';
    }
}
exports.default = CardNotActiveRule;
