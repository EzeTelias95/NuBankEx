import Transaction from "./Transaction";
import _ from 'lodash';

export default class Account {
    activeCard: boolean;
    availableLimit: number;
    lastTransactionTime: Date | null;
    transactions: Array<Transaction>;

    constructor(activeCard: boolean, availableLimit: number){
        this.activeCard = activeCard;
        this.availableLimit = availableLimit;
        this.lastTransactionTime = null;
        this.transactions = new Array<Transaction>();
    }

    public addTransaction(transaction: Transaction){
        this.availableLimit = this.availableLimit - transaction.amount;
        this.transactions.push(transaction);
    }

    public getStatus(){ //TODO: Refactor 
        return { "active-card": this.activeCard, "available-limit": this.availableLimit };
    }

    public getTransactionsFromDate(date: Date): Array<Transaction> {
        return _.filter( this.transactions, (transaction) => transaction.time >= date );
    }
}