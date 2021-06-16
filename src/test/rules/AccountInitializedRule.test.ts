import AccountInitializedRule from "../../rules/transaction/AccountInitializedRule";
import Account from "../../types/Account";
import Transaction from "../../types/Transaction";

test("account initialized rule with account should expect to be true", () => {
      let transactionTest = new Transaction("test", 1, new Date());
      let accountTest = new Account(false,100)
      
    expect(new AccountInitializedRule().execute(accountTest, transactionTest)).toBe(true);
});

test("account initialized rule with no account should expect to be false", () => {
  let transactionTest = new Transaction("test", 1, new Date());
    
  expect(new AccountInitializedRule().execute(null, transactionTest)).toBe(false);
});