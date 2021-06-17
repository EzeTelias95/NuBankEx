"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const messages_1 = require("../../strings/messages");
class HighFreqSIntervalRule {
    execute(account, transaction) {
        let newDate = new Date(transaction.time);
        newDate.setMinutes(newDate.getMinutes() - 3);
        if (account && account.getTransactionsFromDate(newDate).length >= 2) {
            return false;
        }
        return true;
    }
    violationMessage() {
        return messages_1.HIGH_FREQ_SMALL_INTERVAL;
    }
}
exports.default = HighFreqSIntervalRule;
