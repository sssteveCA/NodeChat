import { Request, Response } from "express";
import { Account } from "../../../classes/database/models/account";
import { MongoDbModelManagerInterface } from "../../../classes/database/mongodbmodelmanager";
import { Messages } from "../../../namespaces/messages";
import { Schemas } from "../../../namespaces/schemas";

import { setUsernameObject } from "./account_api_functions";

export function user_info_api(req: Request, res: Response){
    let user_id: string = req.body["user_id"];
    let mmi_data: MongoDbModelManagerInterface = {
        collection_name: process.env.MONGODB_ACCOUNTS_COLLECTION as string,
        schema: Schemas.ACCOUNTS
    };
    let account: Account = new Account(mmi_data,{});
    account.getAccount({_id: user_id}).then(obj => {
        if(obj["done"] == true){
            let account: object = setUsernameObject(obj);
            /* console.log("account_api user_info account => ");
            console.log(account); */
            return res.status(200).json({
                done: obj["done"],
                account: account
            });
        }//if(obj["done"] == true){
        else{
            return res.status(404).json({ done: false, msg: Messages.ERROR_USERNOTFOUND });
        }
    }).catch(err => {
        return res.status(500).json({
            done: false, msg: Messages.ERROR_SERVER
        });
    })
}