import TransactionEvaluator from "./TransactionEvaluator";
import Account from "./types/Account";
import Transaction from "./types/Transaction";

export default class Authorizer {
    account: Account;
    transactionEvaluator: TransactionEvaluator
    constructor(){
        this.account = null;
        this.transactionEvaluator = new TransactionEvaluator();
    };

    public addAccount(account: Account){
        if (this.account){
            return "account-already-initialized";
        }
        else{
            this.account = account;
            return this.account.getStatus();
        }
    }

    public processTransaction(transaction: Transaction){
        let violations = this.transactionEvaluator.Evaluate( this.account, transaction );
        if (violations.length === 0) {
            this.account.addTransaction(transaction);
        }
        return { "account": this.account ? this.account.getStatus(): {}, "violations": violations }
    }

    
}