import { Request } from "express";
import { Constants } from "../namespaces/constants";
import { Schemas } from "../namespaces/schemas";
import { Account } from "./database/models/account";
import { Token, TokenInterface } from "./database/models/token";
import { MongoDbModelManagerInterface } from "./database/mongodbmodelmanager";

export class General{

    /**
     * Parse a Date object into date string
     * @param date Date
     * @returns YYYY-MM-DD hh:mm:ss string data
     */
     public static dateString(date: Date):string{
        let year = date.getFullYear();
        let month = date.getMonth() < 10 ? "0"+date.getMonth() : date.getMonth();
        let day = date.getDate() < 10 ? "0"+date.getDate() : date.getDate();
        let hours = date.getHours() < 10 ? "0"+date.getHours() : date.getHours();
        let minutes = date.getMinutes() < 10 ? "0"+date.getMinutes() : date.getMinutes();
        let seconds = date.getSeconds() < 10 ? "0"+date.getSeconds() : date.getSeconds();
        let stringDate: string = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        return stringDate;
    }

    /**
     * Get the account object that has a specific id
     * @param accountId the id of the account document to search
     * @returns an object that indicates the result of the search
     */
    public static async getAccountById(accountId: string): Promise<object>{
        let response: object = {};
        let mmmiData: MongoDbModelManagerInterface = {
            collection_name: process.env.MONGODB_ACCOUNTS_COLLECTION as string,
            schema: Schemas.ACCOUNTS
        }
        let account: Account = new Account(mmmiData,{});
        response = await account.getAccount({_id: accountId});
        return response;
    }

    /**
     * Get the user account id associated with the token
     * @param token_key the token key of the user logged
     * @returns the account id
     */
    public static async getAccountId(token_key: string): Promise<string|null>{
        let accountId: string|null = null;
        let mmiData: MongoDbModelManagerInterface = {
            collection_name: process.env.MONGODB_TOKENS_COLLECTION as string,
            schema: Schemas.TOKENS
        }
        /* console.log ("GetAccountId tokenData => ");
        console.log(tokenData); */
        let token: Token = new Token(mmiData,{});
        await token.getToken({tokenKey: token_key}).then(res =>{
           /*  console.log("General getAccountId getToken then => ");
            console.log(res); */
            if(res[Constants.KEY_DONE] == true) accountId = token.accountId;  
        });
        return accountId;
    }

    /**
     * Get the token from the NodeChat custom Authorization header
     * @param req the request instance
     * @returns 
     */
    public static getAuthToken(req: Request): string{
        let auth_header = req.get('NodeChatAuth');
        //console.log(auth_header);
        if(typeof auth_header !== "undefined")
           return auth_header;
        return "";  
    }

    /**
     * Check if a string matches with a given pattern
     * @param regex the regular expression
     * @param value the value to perform the search
     * @returns true if the string matches, false otherwise
     */
    public static patternMatch(regex: string, value: string): boolean{
        let regexp: RegExp = new RegExp(regex);
        return regexp.test(value);   
    }
}