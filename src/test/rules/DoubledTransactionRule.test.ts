import DoubledTransactionRule from "../../rules/transaction/DoubledTransactionRule";
import Account from "../../types/Account";
import Transaction from "../../types/Transaction";

test("doubled transaction rule with two equal transactions should expect to be false", () => {
    let account = new Account(true, 18000);
    let transaction = new Transaction("BurgerKing", 700, new Date());
    let doubledTransaction = new Transaction("BurgerKing", 700, new Date());
    
    account.transactions = [transaction];
    
    expect(new DoubledTransactionRule().execute(account, doubledTransaction)).toBe(false);
});

test("doubled transaction rule with two different transactions should expect to be true", () => {
    let account = new Account(true, 18000);
    let transaction = new Transaction("BurgerKing", 700, new Date());
    let notDoubledTransaction = new Transaction("BurgerKing", 750, new Date());
   
    account.transactions = [transaction];
    
  expect(new DoubledTransactionRule().execute(account , notDoubledTransaction)).toBe(true);
});