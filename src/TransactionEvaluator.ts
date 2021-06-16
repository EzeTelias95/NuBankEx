import Account from './types/Account';
import Transaction from './types/Transaction';
import IRule from "./rules/IRule";
import AccountInitializedRule from './rules/transaction/AccountInitializedRule';
import CardNotActiveRule from './rules/transaction/CardNotActiveRule';
import DoubledTransactionRule from './rules/transaction/DoubledTransactionRule';
import HighFreqSIntervalRule from './rules/transaction/HighFreqSIntervalRule';
import InsufficientLimitRule from './rules/transaction/InsufficientLimitRule';



export default class TransactionEvaluator {
    _rules: Array<IRule> = [];
    
    constructor()
    {
        this._rules.push(new AccountInitializedRule);
        this._rules.push(new InsufficientLimitRule);
        this._rules.push(new CardNotActiveRule);
        this._rules.push(new HighFreqSIntervalRule);
        this._rules.push(new DoubledTransactionRule);
    }

    public Evaluate(account: Account, transaction: Transaction): Array<string>{
        let violations: Array<string> = []
        this._rules.forEach(rule => {
            if (!rule.execute(account, transaction)) violations.push(rule.violationMessage());
        });
        return violations;
    }
}