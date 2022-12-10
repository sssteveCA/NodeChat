import { Request, Response } from "express";
import { Account } from "../../../classes/database/models/account";
import { Token } from "../../../classes/database/models/token";
import { MongoDbModelManagerInterface } from "../../../classes/database/mongodbmodelmanager";
import { Messages } from "../../../namespaces/messages";
import { Paths } from "../../../namespaces/paths";
import { Schemas } from "../../../namespaces/schemas";

export function current_user_api(req: Request, res: Response){
    let tokenKey: string = res.locals["tokenKey"];
    let mmi_data: MongoDbModelManagerInterface = {
        collection_name: process.env.MONGODB_TOKENS_COLLECTION as string,
        schema: Schemas.TOKENS
    };
    let token: Token = new Token(mmi_data,{});
    token.getToken({tokenKey: tokenKey}).then(obj => {
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
        //console.log(obj);
        if(obj["done"] == true){
            let account: object = setUsernameObject(obj);
            /* console.log("account_api current_user account => ");
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
        console.warn(err);
        return res.status(500).json({
            done: false, msg: Messages.ERROR_SERVER
        });
    });
}

function setUsernameObject(obj: object): object{
    let usernameObject: object = {
        name: obj["result"]["name"], surname: obj["result"]["surname"], email: obj["result"]["email"],
        contacts: obj["result"]["contacts"], education: obj["result"]["education"],
        employment: obj["result"]["employment"],
        images: obj["result"]["images"], otherPersonals: obj["result"]["otherPersonals"],
        videos: obj["result"]["videos"],
    };
    if(!usernameObject["images"] || !usernameObject["images"]["profileImage"] || usernameObject["images"]["profileImage"] == '' || !usernameObject["images"]["coverImage"] || usernameObject["images"]["coverImage"] == ''){
        usernameObject["images"]["profileImage"] = "../.."+Paths.STATIC_IMG_DEFAULT+"/profile_image.jpg";
        usernameObject["images"]["coverImage"] = "../.."+Paths.STATIC_IMG_DEFAULT+"/cover_image.jpg";
    }
    return usernameObject;
}