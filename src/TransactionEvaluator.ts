import Account from './types/Account';
import Transaction from './types/Transaction';
import IRule from "./rules/IRule";
import AccountInitializedRule from "./rules/Transaction/AccountInitializedRule";
import InsufficientLimitRule from './rules/Transaction/InsufficientLimitRule';
import CardNotActiveRule from './rules/Transaction/CardNotActiveRule';
import HighFreqSIntervalRule from './rules/Transaction/HighFreqSIntervalRule';
import DoubledTransactionRule from './rules/Transaction/DoubledTransactionRule';


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