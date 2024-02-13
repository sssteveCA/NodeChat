import { Request, Response } from "express";
import { Account } from "../../../../classes/database/models/account";
import { MongoDbModelManagerInterface } from "../../../../classes/database/mongodbmodelmanager";
import { Constants } from "../../../../namespaces/constants";
import { Messages } from "../../../../namespaces/messages";
import { Schemas } from "../../../../namespaces/schemas";

import { setUsernameObject } from "./account_api_functions";

export function user_info_api(req: Request, res: Response){
    let user_id: string = req.query["user_id"] as string;
    let mmi_data: MongoDbModelManagerInterface = {
        collection_name: process.env.MONGODB_ACCOUNTS_COLLECTION as string,
        schema: Schemas.ACCOUNTS
    };
    let account: Account = new Account(mmi_data,{});
    account.getAccount({_id: user_id}).then(obj => {
        if(obj[Constants.KEY_DONE] == true){
            let baseUrl: string = `${req.protocol}://${req.get('host')}`;
            let account: object = setUsernameObject(obj,baseUrl);
            return res.status(200).json({
                done: obj[Constants.KEY_DONE],
                account: account
            });
        }//if(obj[Constants.KEY_DONE] == true){
        else{
            return res.status(404).json({ done: false, message: Messages.ERROR_USERNOTFOUND });
        }
    }).catch(err => {
        return res.status(500).json({
            done: false, message: Messages.ERROR_SERVER
        });
    })
}