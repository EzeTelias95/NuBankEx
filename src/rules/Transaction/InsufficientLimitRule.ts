import IRule from "../IRule";
import Account from '../../types/Account';
import Transaction from '../../types/Transaction';
import { INSUFFICIENT_LIMIT } from "../../strings/messages";

export default class InsufficientLimitRule implements IRule {
    execute(account: Account, transaction: Transaction): boolean {
        if (account && transaction.amount > account.availableLimit){
            return false
        }
        return true;
    }
    violationMessage(): string {
        return INSUFFICIENT_LIMIT;
    }
}