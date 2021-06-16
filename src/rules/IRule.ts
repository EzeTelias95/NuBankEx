import Account from '../types/Account';
import Transaction from '../types/Transaction';

export default interface IRule {
    execute(account: Account, transaction: Transaction): boolean; // return false if rule is not matched
    violationMessage(): string;
} 