import HighFreqSIntervalRule from "../../rules/transaction/HighFreqSIntervalRule";
import Account from "../../types/Account";
import Transaction from "../../types/Transaction";

test(" high frequency transactions rule with three transactions in an interval of minimun three minutes should expect to be false", () => {
  let account = new Account(true, 18000);
  let dateTest = new Date()
  let transaction = new Transaction("BurgerKing", 700, dateTest);
  let transaction2 = new Transaction("BurgerKing", 730, dateTest);
  let highFreqTransaction = new Transaction("BurgerKing", 700, dateTest);
  
  account.transactions = [transaction,transaction2];
  
  expect(new HighFreqSIntervalRule().execute(account, highFreqTransaction)).toBe(false);
});

test("high frequency transactions rule with two transactions in an interval of minimun three minutes should expect to be true", () => {
  let account = new Account(true, 18000);
  let dateTest = new Date()
  let transaction = new Transaction("BurgerKing", 700, dateTest);
  let highFreqTransaction = new Transaction("BurgerKing", 750, dateTest);
 
  account.transactions = [transaction];
  
expect(new HighFreqSIntervalRule().execute(account , highFreqTransaction)).toBe(true);
});

test("high frequency transactions rule with three transactions in an interval of more than three minutes should expect to be true", () => {
  let account = new Account(true, 18000);
  let dateTest = new Date();
  let datePlusThreeMinutes = new Date()
  datePlusThreeMinutes.setMinutes(dateTest.getMinutes() + 4);

  let transaction = new Transaction("BurgerKing", 700, dateTest);
  let transaction2 = new Transaction("BurgerKing", 730, dateTest);
  let highFreqTransaction = new Transaction("BurgerKing", 700, datePlusThreeMinutes);
  
  account.transactions = [transaction,transaction2];
 
expect(new HighFreqSIntervalRule().execute(account , highFreqTransaction)).toBe(true);
});