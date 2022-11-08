
import express from 'express';
import { ObjectId } from 'mongoose';
import { Account } from '../../../classes/database/models/account';
import { Accounts, AccountsInterface } from '../../../classes/database/models/accounts';
import { Token } from '../../../classes/database/models/token';
import { MongoDbModelManagerInterface } from '../../../classes/database/mongodbmodelmanager';
import { MongoDbModelsManagerInterface } from '../../../classes/database/mongodbmodelsmanager';
import { MyProfileSections } from '../../../enums/enums';
import { Messages } from '../../../namespaces/messages';
import { Schemas } from '../../../namespaces/schemas';
import { loggedApi } from '../middlewares/middlewares_api';

export const account_routes_api = express.Router();

account_routes_api.post('/profile/section/:section', loggedApi, async(req,res)=>{
    let tokenKey: string = res.locals["tokenKey"];
    let section: string = req.params['section'];
    if((<any>Object).values(MyProfileSections).includes(section)){
        let mmi_data: MongoDbModelManagerInterface = {
            collection_name: process.env.MONGODB_TOKENS_COLLECTION as string,
            schema: Schemas.TOKENS
        };
        let token: Token = new Token(mmi_data,{});
        await token.getToken({tokenKey: tokenKey}).then(obj => {
            if(obj["done"] == true){
                let accountId = obj["result"]["accountId"];
                return accountId;
            }
            else throw new Error("");
        }).then(accountId => {
            let mmi_data: MongoDbModelManagerInterface = {
                collection_name: process.env.MONGODB_ACCOUNTS_COLLECTION as string, schema: Schemas.ACCOUNTS
            };
            let account: Account = new Account(mmi_data,{});
            return account.getAccount({_id: accountId});
        }).then(obj => {
            console.log(obj);
            return res.status(200).json(obj);
        })
        .catch(err => {
            console.warn(err);
            return res.status(500).json({
                done: false, msg: Messages.ERROR_SERVER
            });
        });
    }//if((<any>Object).values(MyProfileSections).includes(section)){
    else return res.status(404).json({msg: "Sezione profilo non trovata"});
})

account_routes_api.post('/profile/search', loggedApi, async(req,res)=>{
    let query: string = req.body.query as string;
    if(query && query != ""){
        let mmis_data: MongoDbModelsManagerInterface = {
            collection_name: process.env.MONGODB_ACCOUNTS_COLLECTION as string, schema: Schemas.ACCOUNTS
        };
        let accounts_data: AccountsInterface = {};
        let accounts: Accounts = new Accounts(mmis_data,accounts_data);
        await accounts.getAccounts({username: {$regex: `^${query}`, $options: "i"}}).then(result => {
            let response: object = { done: true, msg: '', result: result['result'] };
            return res.json(response);
        }).catch(err => {
            return res.status(500).json({done: false, msg: Messages.ERROR_SERVER});
        });
    }//if(query && query != ""){
    else{
        return res.status(400).json({done: false, msg: "Digita un termine di ricerca per continuare"});
    }
});