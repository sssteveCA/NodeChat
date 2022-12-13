import { Request, Response } from "express";
import { Accounts, AccountsInterface } from "../../../../classes/database/models/accounts";
import { MongoDbModelsManagerInterface } from "../../../../classes/database/mongodbmodelsmanager";
import { Messages } from "../../../../namespaces/messages";
import { Paths } from "../../../../namespaces/paths";
import { Schemas } from "../../../../namespaces/schemas";

export async function search_api(req: Request, res: Response){
    let query: string = req.body.query as string;
    if(query && query != ""){
        let mmis_data: MongoDbModelsManagerInterface = {
            collection_name: process.env.MONGODB_ACCOUNTS_COLLECTION as string, schema: Schemas.ACCOUNTS
        };
        let accounts_data: AccountsInterface = {};
        let accounts: Accounts = new Accounts(mmis_data,accounts_data);
        await accounts.getAccounts({username: {$regex: `^${query}`, $options: "i"}}).then(result => {
            console.log("search_api getAccounts");
            console.log(result);
            let response: object = { done: true, msg: '', result: result['result'] };
            const baseUrl: string = `${req.protocol}://${req.get('host')}`;
            response['_images']['profileImage'] = setBaseUrl(baseUrl,response['_images']['profileImage']);
            return res.status(200).json(response);
        }).catch(err => {
            return res.status(500).json({done: false, msg: Messages.ERROR_SERVER});
        });
    }//if(query && query != ""){
    else{
        return res.status(400).json({done: false, msg: "Digita un termine di ricerca per continuare"});
    }
}

/**
 * Prepend the base url to a relative URL
 * @param baseUrl the base url
 * @param url the relative URL
 * @returns the full URL that contains the base URL and the relative URL
 */
function setBaseUrl(baseUrl: string, url: string): string{
    if(url && url != "")
        return baseUrl+url;
    return baseUrl+Paths.STATIC_IMG_DEFAULT+"/profile_image.jpg";
}