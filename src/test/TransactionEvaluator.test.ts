import TransactionEvaluator from "../TransactionEvaluator";
import Account from "../types/Account";
import Transaction from "../types/Transaction";

let transactionEvaluator = new TransactionEvaluator();
let dateTest = new Date();


test("transaction evaluator with inactive card shoud get card not active violation", () => {
    let transactionTest = new Transaction("test", 10, dateTest);
    let accountTest = new Account(false,100)
    let violations = transactionEvaluator.Evaluate( accountTest, transactionTest );
    expect(violations).toEqual(["card-not-active"]);
});

test("transaction evaluator with one transaction no violations", () => {
  let transactionTest = new Transaction("test", 10, dateTest);
  let accountTest = new Account(true,100)
  let violations = transactionEvaluator.Evaluate( accountTest, transactionTest );
  expect(violations).toEqual([]);
});

test("transaction evaluator with less available limit than the transdaction amount shoud get insufficient limit violation", () => {
  let transactionTest = new Transaction("test", 110, dateTest);
  let accountTest = new Account(true,100)
  let violations = transactionEvaluator.Evaluate( accountTest, transactionTest );
  expect(violations).toEqual(["insufficient-limit"]);
});

test("transaction evaluator with no account shoud get account not initialized violation", () => {
  let transactionTest = new Transaction("test", 110, dateTest);
  let violations = transactionEvaluator.Evaluate( null, transactionTest );
  expect(violations).toEqual(["account-not-initialized"]);
});


test("transaction evaluator with double transaction shoud get doubled transaction violation", () => {
  let account = new Account(true, 18000);
  let transaction = new Transaction("BurgerKing", 700, new Date());
  let doubledTransaction = new Transaction("BurgerKing", 700, new Date());
    
  account.transactions = [transaction];
  
  let violations = transactionEvaluator.Evaluate( account, doubledTransaction);
  expect(violations).toEqual(["doubled-transaction"]);
});

test("transaction evaluator with high frequency transaction shoud get high frequency small interval transactions violation", () => {
  let account = new Account(true, 18000);
  let transaction = new Transaction("BurgerKing", 700, dateTest);
  let transaction2 = new Transaction("BurgerKing", 730, dateTest);
  let highFreqTransaction = new Transaction("BurgerKing", 800, dateTest);
  
  account.transactions = [transaction,transaction2];
  
  let violations = transactionEvaluator.Evaluate( account, highFreqTransaction);
  expect(violations).toEqual(["high-frequency-small-interval"]);
});

test("transaction evaluator with high frequency transaction and a doubled transaction shoud get both violations", () => {
  let account = new Account(true, 18000);
  let transaction = new Transaction("BurgerKing", 700, dateTest);
  let transaction2 = new Transaction("BurgerKing", 730, dateTest);
  let highFreqTransaction = new Transaction("BurgerKing", 700, dateTest);
  
  account.transactions = [transaction,transaction2];
  
  let violations = transactionEvaluator.Evaluate( account, highFreqTransaction);
  expect(violations).toContain("high-frequency-small-interval");
  expect(violations).toContain("doubled-transaction");
});