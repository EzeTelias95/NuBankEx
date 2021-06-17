"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const Authorizer_1 = __importDefault(require("./Authorizer"));
const Account_1 = __importDefault(require("./types/Account"));
const Transaction_1 = __importDefault(require("./types/Transaction"));
var stdin = process.openStdin();
console.log();
stdin.addListener("data", function (input) {
    let filePath = input.toString().trim();
    let data = fs_1.default.readFile(filePath, (e, d) => {
        let authorizer = new Authorizer_1.default();
        let lines = d.toString().split("\r");
        lines.forEach((line) => {
            let operation = JSON.parse(line);
            if (operation.hasOwnProperty("account")) {
                let account = new Account_1.default(operation.account["active-card"], operation.account["available-limit"]);
                console.log(authorizer.addAccount(account));
            }
            else {
                let transaction = operation.transaction;
                let newTransaction = new Transaction_1.default(transaction.merchant, parseInt(transaction.amount), new Date(transaction.time));
                console.log(authorizer.processTransaction(newTransaction));
            }
        });
    });
});
