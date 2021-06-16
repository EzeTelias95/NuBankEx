import fs from 'fs';
import Authorizer from './Authorizer';
import Account from './types/Account';
import Transaction from './types/Transaction';
var stdin = process.openStdin();

let authorizer = new Authorizer();
stdin.addListener("data", function(input) {

    let filePath = input.toString().trim();
    let data = fs.readFile(filePath, ( e, d )=>{
        let lines = d.toString().split("\r");

            lines.forEach((line) =>{    
                let operation = JSON.parse(line);

                if (operation.hasOwnProperty("account")){
                    let account = new Account(operation.account["active-card"],operation.account["available-limit"]);
                    console.log(authorizer.addAccount(account));
                }
                else {
                    let transaction = operation.transaction;
                    let newTransaction = new Transaction(transaction.merchant, parseInt(transaction.amount), transaction.time)
                    console.log(authorizer.processTransaction(newTransaction));
                }
                
            });

        });
    
    
});