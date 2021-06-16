import Authorizer from "../Authorizer";
import Account from "../types/Account";
import Transaction from "../types/Transaction";

test("authorizer addaccount should add account", () => {
  let account = new Account(true, 18000);
  let auth = new Authorizer();
  auth.addAccount(account);
  
  expect(auth.account).toEqual(account);
});

test("authorizer should have null account if not added", () => {
    let auth = new Authorizer();
    
    expect(auth.account).toBeNull();
});

test("authorizer should process one transaction and get no violations", () => {
    let account = new Account(true, 18000);
    let auth = new Authorizer();
    auth.addAccount(account);
    let transaction = new Transaction("BurgerKing", 700, new Date());

    let result = auth.processTransaction(transaction);

    expect(result).toEqual({ "account": account.getStatus(), "violations": [] });
  });

test("authorizer should process one transaction and get insufficient limit violations", () => {
    let account = new Account(true, 600);
    let auth = new Authorizer();
    auth.addAccount(account);
    let transaction = new Transaction("BurgerKing", 700, new Date());

    let result = auth.processTransaction(transaction);

    expect(result).toEqual({ "account": account.getStatus(), "violations": ["insufficient-limit"] });
  });

test("authorizer should process one transaction and get card inactive violations", () => {
    let account = new Account(false, 900);
    let auth = new Authorizer();
    auth.addAccount(account);
    let transaction = new Transaction("BurgerKing", 700, new Date());

    let result = auth.processTransaction(transaction);

    expect(result).toEqual({ "account": account.getStatus(), "violations": ["card-not-active"] });
  });

test("authorizer should process one transaction and get account not initialized violations", () => {
    let auth = new Authorizer();
    let transaction = new Transaction("BurgerKing", 700, new Date());

    let result = auth.processTransaction(transaction);

    expect(result).toEqual({ "account": {}, "violations": ["account-not-initialized"] });
  });

 test("authorizer should process doubled transactiond and get doubled transactions violations", () => {
    let account = new Account(true, 1900);
    let auth = new Authorizer();
    auth.addAccount(account);
    let transaction = new Transaction("BurgerKing", 700, new Date());
    let transaction2 = new Transaction("BurgerKing", 700, new Date());

    auth.processTransaction(transaction);
    let result = auth.processTransaction(transaction2);


    expect(result).toEqual({ "account": account.getStatus(), "violations": ["doubled-transaction"] });
});

test("authorizer should process three transactions in less than three minutes and get high frequency small interval violations", () => {
    let account = new Account(true, 18000);
    let auth = new Authorizer();
    auth.addAccount(account);
    let transaction = new Transaction("BurgerKing", 700, new Date());
    let transaction2 = new Transaction("BurgerKing", 400, new Date());
    let transaction3 = new Transaction("BurgerKing", 800, new Date());

    auth.processTransaction(transaction);
    auth.processTransaction(transaction2);

    let result = auth.processTransaction(transaction3);
    expect(result).toEqual({ "account": account.getStatus(), "violations": ['high-frequency-small-interval'] });
});