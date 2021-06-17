import { ACCOUNT_ALREADY_INITIALIZED } from "./strings/messages";
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
            return { "account": this.account ? this.account.getStatus(): {}, "violations": [ACCOUNT_ALREADY_INITIALIZED] };
        }
        else{
            this.account = account;
            return { "account": this.account ? this.account.getStatus(): {}, "violations": [] }
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