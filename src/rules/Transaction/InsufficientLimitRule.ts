import IRule from "../IRule";
import Account from '../../types/Account';
import Transaction from '../../types/Transaction';

export default class InsufficientLimitRule implements IRule {
    execute(account: Account, transaction: Transaction): boolean {
        if (transaction.amount > account.availableLimit){
            return false
        }
        return true;
    }
    violationMessage(): string {
        return 'insufficient-limit';
    }
}