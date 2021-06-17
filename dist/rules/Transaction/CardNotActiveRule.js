"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const messages_1 = require("../../strings/messages");
class CardNotActiveRule {
    execute(account, transaction) {
        if (account && !account.activeCard) {
            return false;
        }
        return true;
    }
    violationMessage() {
        return messages_1.CARD_NOT_ACTIVE;
    }
}
exports.default = CardNotActiveRule;
