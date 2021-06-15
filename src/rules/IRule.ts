import Account from '../types/Account';
import Transaction from '../types/Transaction';

export default interface IRule {
    execute(account: Account, transaction: Transaction): boolean;
    violationMessage(): string;
} 