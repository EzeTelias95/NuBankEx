import Account from "../../types/Account";
import Transaction from "../../types/Transaction";

test("account with inactive card should have activeCard property set false", () => {
      let account = new Account(false,100);
    expect(account.activeCard).toBe(false);
});

test("account with active card should have activeCard property set true", () => {
    let account = new Account(true,100);
  expect(account.activeCard).toBe(true);
});

test("account with available limit of 100 should have available limit property set to 100", () => {
    let account = new Account(true,100);
  expect(account.availableLimit).toBe(100);
});

test("account with available limit of 100 and active card should get correct status", () => {
    let account = new Account(true,100);
  expect(account.getStatus()).toEqual( { "active-card": true, "available-limit": 100 } );
});

test("account with available limit of 100 and a new transaction of 100 should get availableLimit of 0", () => {
    let account = new Account(true,100);
    account.addTransaction(new Transaction("test",100,new Date()));
  expect(account.availableLimit).toEqual(0);
});

test("account with one transaction should retrieve", () => {
    let account = new Account(true,100);
    let date = new Date();
    account.addTransaction(new Transaction("test",100,date));
  expect(account.getTransactionsFromDate(date).length).toBe(1);
});