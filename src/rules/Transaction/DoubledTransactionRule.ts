import IRule from "../IRule";
import Account from '../../types/Account';
import Transaction from '../../types/Transaction';
import _ from 'lodash';
import { DOUBLED_TRANSACTION } from "../../strings/messages";

export default class DoubledTransactionRule implements IRule {
    execute(account: Account, transaction: Transaction): boolean {
        let newDate = new Date(transaction.time);
        newDate.setMinutes(newDate.getMinutes() - 2)
        let doubledTransactions = _.filter(account && account.getTransactionsFromDate(newDate),  (oldTransaction) => oldTransaction.merchant === transaction.merchant && oldTransaction.amount === transaction.amount)
        if (doubledTransactions.length === 0){
            return true
        }
        return false;        
    }
    violationMessage(): string {
        return DOUBLED_TRANSACTION;
    }
}