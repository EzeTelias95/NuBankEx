export default class Transaction {
    merchant: string; 
    amount: number;
    time: Date;
    constructor(merchant: string, amount: number, time: Date){
        this.merchant = merchant;
        this.amount = amount;
        this.time = time;
    }
}