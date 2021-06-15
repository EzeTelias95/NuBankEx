import Authorizer  from './Authorizer';
import Account from './types/Account';
import Transaction from './types/Transaction';

let account = new Account(true, 18000);
let transaction = new Transaction("BurgerKing", 700, new Date());
let transaction2 = new Transaction("BurgerKing", 750, new Date());
let transaction3 = new Transaction("BurgerKing", 800, new Date());


let auth = new Authorizer();
auth.addAccount(account);
let result = auth.processTransaction(transaction);

console.log(result);
let result2 = auth.processTransaction(transaction2);
console.log(result2);

let result3 = auth.processTransaction(transaction3);
console.log(result3);