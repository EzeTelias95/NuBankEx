import InsufficientLimitRule from "../../rules/transaction/InsufficientLimitRule";
import Account from "../../types/Account";
import Transaction from "../../types/Transaction";

test("insufficient limit rule with an account with more limit than the transaction amount should expect to be true", () => {
    let transactionTest = new Transaction("test", 10, new Date());
    let accountTest = new Account(true,100);
      
    expect(new InsufficientLimitRule().execute(accountTest, transactionTest)).toBe(true);
});

test("insufficient limit rule with an account with less limit than the transaction amount should expect to be false", () => {
  let transactionTest = new Transaction("test", 110, new Date());
  let accountTest = new Account(true,100);

  expect(new InsufficientLimitRule().execute(accountTest, transactionTest)).toBe(false);
});