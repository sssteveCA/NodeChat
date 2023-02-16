import { Request, Response } from "express";
import { Accounts, AccountsInterface } from "../../../../../classes/database/models/accounts";
import { MongoDbModelsManagerInterface } from "../../../../../classes/database/mongodbmodelsmanager";
import { Messages } from "../../../../../namespaces/messages";
import { Paths } from "../../../../../namespaces/paths";
import { Schemas } from "../../../../../namespaces/schemas";

export async function search_api(req: Request, res: Response){
    let query: string = req.body.query as string;
    if(query && query != ""){
        let mmis_data: MongoDbModelsManagerInterface = {
            collection_name: process.env.MONGODB_ACCOUNTS_COLLECTION as string, schema: Schemas.ACCOUNTS
        };
        let accounts_data: AccountsInterface = {};
        let accounts: Accounts = new Accounts(mmis_data,accounts_data);
        await accounts.getAccounts({username: {$regex: `^${query}`, $options: "i"}}).then(result => {
            /* console.log("search_api getAccounts");
            console.log(result); */
            let response: object = { done: true, message: '', result: result['result'] };
            const baseUrl: string = `${req.protocol}://${req.get('host')}`;
            response = setBaseUrl(baseUrl,response);
            return res.status(200).json(response);
        }).catch(err => {
            return res.status(500).json({done: false, message: Messages.ERROR_SERVER});
        });
    }//if(query && query != ""){
    else{
        return res.status(400).json({done: false, message: "Digita un termine di ricerca per continuare"});
    }
}

/**
 * Prepend the base url to each relative URL
 * @param baseUrl the base url
 * @param response the object that contains the relative URLs
 * @returns the full URL that contains the base URL and the relative URL
 */
function setBaseUrl(baseUrl: string, response: object): object{
    let responseCopy = JSON.parse(JSON.stringify(response));
    /* console.log("setBaseUrl responseCopy => ");
    console.log(responseCopy); */
    if(Array.isArray(responseCopy['result'])){
        let results = responseCopy['result'].map((account => {
            if(account['_images'] && account['_images']['profileImage'] && account['_images']['profileImage'] != '')
                account['_images']['profileImage'] = baseUrl+account['_images']['profileImage'];
            else
                account['_images']['profileImage'] = baseUrl+Paths.STATIC_IMG_DEFAULT+"/profile_image.jpg";
            return account;
            
        }));
        responseCopy['result'] = results;
        /* console.log("responseCopy result => ");
        console.log(responseCopy['result']); */
    }//if(Array.isArray(responseCopy['result'])){
    return responseCopy;
}