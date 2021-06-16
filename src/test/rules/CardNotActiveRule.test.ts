import CardNotActiveRule from "../../rules/transaction/CardNotActiveRule";
import Account from "../../types/Account";

test("Card not active rule with active card should expect to be true", () => {
      let accountTest = new Account(true,100)
      
    expect(new CardNotActiveRule().execute(accountTest, null)).toBe(true);
});

test("Card not active rule with inactive card should expect to be false", () => {
  let accountTest = new Account(false,100)
 
  expect(new CardNotActiveRule().execute(accountTest, null)).toBe(false);
});