import { Schemas } from "../namespaces/schemas";
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
            if(res["done"] == true) accountId = token.accountId;  
        });
        return accountId;
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