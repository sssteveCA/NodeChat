import { Request, Response } from "express";
import { Account } from "../../../../classes/database/models/account";
import { Token } from "../../../../classes/database/models/token";
import { MongoDbModelManagerInterface } from "../../../../classes/database/mongodbmodelmanager";
import { Constants } from "../../../../namespaces/constants";
import { Messages } from "../../../../namespaces/messages";
import { Paths } from "../../../../namespaces/paths";
import { Schemas } from "../../../../namespaces/schemas";
import { setUsernameObject } from "./account_api_functions";

export function current_user_api(req: Request, res: Response){
    let tokenKey: string = res.locals["tokenKey"];
    let mmi_data: MongoDbModelManagerInterface = {
        collection_name: process.env.MONGODB_TOKENS_COLLECTION as string,
        schema: Schemas.TOKENS
    };
    let token: Token = new Token(mmi_data,{});
    token.getToken({tokenKey: tokenKey}).then(obj => {
        if(obj[Constants.KEY_DONE] == true){
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
        //console.log(obj);
        if(obj[Constants.KEY_DONE] == true){
            let baseUrl: string = `${req.protocol}://${req.get('host')}`;
            let account: object = setUsernameObject(obj,baseUrl);
            /* console.log("account_api current_user account => ");
            console.log(account); */
            return res.status(200).json({
                done: obj[Constants.KEY_DONE],
                account: account
            });
        }//if(obj[Constants.KEY_DONE] == true){
        else{
            return res.status(404).json({ done: false, msg: Messages.ERROR_USERNOTFOUND });
        }
    }).catch(err => {
        console.warn(err);
        return res.status(500).json({
            done: false, msg: Messages.ERROR_SERVER
        });
    });
}