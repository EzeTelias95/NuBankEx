import IRule from "../IRule";
import Account from '../../types/Account';
import Transaction from '../../types/Transaction';
import { ACCOUNT_NOT_INITIALIZED } from "../../strings/messages";

export default class AccountInitializedRule implements IRule {
    execute(account: Account, transaction: Transaction): boolean {
        if (account){
            return true
        }
        return false;
    }
    violationMessage(): string {
        return ACCOUNT_NOT_INITIALIZED;
    }
}