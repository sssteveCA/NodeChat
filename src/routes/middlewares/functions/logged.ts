import { NextFunction, Request, Response } from "express";
import { Token, TokenInterface } from "../../../classes/database/models/token";
import { MongoDbModelManagerInterface } from "../../../classes/database/mongodbmodelmanager";
import { Constants } from "../../../namespaces/constants";
import { Schemas } from "../../../namespaces/schemas";

export async function loggedMiddleware(req: Request, res: Response, next: NextFunction){
    let redirect_string: string = "/login";
    let next_hop: boolean = false;
    if(req.session[Constants.KEY_USERNAME] && req.session[Constants.KEY_TOKEN]){
        let token_key: string = req.session[Constants.KEY_TOKEN];
        let mongo_mmi: MongoDbModelManagerInterface = {
            collection_name: process.env.MONGODB_TOKENS_COLLECTION as string,
            schema: Schemas.TOKENS
        };
        let token_data: TokenInterface = {};
        let token: Token = new Token(mongo_mmi,token_data);
        await token.getToken({tokenKey: token_key}).then(result => {
            if(result[Constants.KEY_DONE] == true && result['result'] != null){
                let nowTimestamp: number = Date.now();
                let expDate: Date = new Date(result['result']['expireDate']);
                let expTime: number = expDate.getTime();
                next_hop = true;
            }//if(result[Constants.KEY_DONE] == true && result['result'] != null){
            else redirect_string = "/login";
        }).catch(err => {
            redirect_string = "/login";
        });
        if(next_hop)
        {
            res.locals.tokenKey = req.session[Constants.KEY_TOKEN];
            return next();
        }
        await token.deleteToken({tokenKey: token_key});
        req.session[Constants.KEY_USERNAME] = null;
        req.session[Constants.KEY_TOKEN] = null;
        req.session.destroy(()=>{
            return res.redirect(redirect_string);
        });
    }//if(req.session[Constants.KEY_USERNAME] && req.session[Constants.KEY_TOKEN]){
    else return res.redirect(redirect_string);
} 