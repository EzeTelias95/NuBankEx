import IRule from "../IRule";
import Account from '../../types/Account';
import Transaction from '../../types/Transaction';
import { HIGH_FREQ_SMALL_INTERVAL } from "../../strings/messages";

export default class HighFreqSIntervalRule implements IRule {
    execute(account: Account, transaction: Transaction): boolean {
        let newDate = new Date(transaction.time);
        newDate.setMinutes(newDate.getMinutes() - 3)
    
        if (account && account.getTransactionsFromDate(newDate).length >= 2){
            return false
        }
        return true;        
    }
    violationMessage(): string {
        return HIGH_FREQ_SMALL_INTERVAL;
    }
}