import IRule from "../IRule";
import Account from '../../types/Account';
import Transaction from '../../types/Transaction';

export default class CardNotActiveRule implements IRule {
    execute(account: Account, transaction: Transaction): boolean {
        if (account && !account.activeCard){
            return false;
        }
        return true;
    }
    violationMessage(): string {
        return 'card-not-active';
    }
}