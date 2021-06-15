import IRule from "../IRule";
import Account from '../../types/Account';
import Transaction from '../../types/Transaction';

export default class AccountInitializedRule implements IRule {
    execute(account: Account, transaction: Transaction): boolean {
        if (account){
            return true
        }
        return false;
    }
    violationMessage(): string {
        return 'account-not-initialized';
    }
}