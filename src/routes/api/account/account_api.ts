
import express from 'express';
import { ObjectId } from 'mongoose';
import { Account } from '../../../classes/database/models/account';
import { Accounts, AccountsInterface } from '../../../classes/database/models/accounts';
import { Token } from '../../../classes/database/models/token';
import { MongoDbModelManagerInterface } from '../../../classes/database/mongodbmodelmanager';
import { MongoDbModelsManagerInterface } from '../../../classes/database/mongodbmodelsmanager';
import { Messages } from '../../../namespaces/messages';
import { Paths } from '../../../namespaces/paths';
import { Schemas } from '../../../namespaces/schemas';
import { loggedApi } from '../middlewares/middlewares_api';
import { current_user_api } from './current_user_api';

export const account_routes_api = express.Router();

account_routes_api.post('/current_user', loggedApi, current_user_api);

account_routes_api.post('/user_info', loggedApi, async(req,res)=>{
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

});

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