"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CardNotActiveRule {
    execute(account, transaction) {
        if (account.activeCard) {
            return true;
        }
        return false;
    }
    violationMessage() {
        return 'card-not-active';
    }
}
exports.default = CardNotActiveRule;
