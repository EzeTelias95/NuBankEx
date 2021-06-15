"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Transaction {
    constructor(merchant, amount, time) {
        this.merchant = merchant;
        this.amount = amount;
        this.time = time;
    }
}
exports.default = Transaction;
