"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HighFreqSIntervalRule {
    execute(account, transaction) {
        let newDate = new Date(transaction.time);
        newDate.setMinutes(newDate.getMinutes() - 3);
        if (account.getTransactionsFromDate(newDate).length >= 2) {
            return false;
        }
        return true;
    }
    violationMessage() {
        return 'high-frequency-small-interval';
    }
}
exports.default = HighFreqSIntervalRule;
