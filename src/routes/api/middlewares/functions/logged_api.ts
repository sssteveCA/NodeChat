import { NextFunction, Request, Response } from "express";
import { Token, TokenInterface } from "../../../../classes/database/models/token";
import { MongoDbModelManagerInterface } from "../../../../classes/database/mongodbmodelmanager";
import { NotAuthenticatedError } from "../../../../classes/errors/notauthenticatederror";
import { General } from "../../../../classes/general";
import { Constants } from "../../../../namespaces/constants";
import { Messages } from "../../../../namespaces/messages";
import { Schemas } from "../../../../namespaces/schemas";

export async function loggedApiMiddleware(req: Request, res: Response, next: NextFunction){
    let token_key = General.getAuthToken(req);
    try{
        if(token_key){
            let mmmi_data: MongoDbModelManagerInterface = {
                collection_name: process.env.MONGODB_TOKENS_COLLECTION as string, schema: Schemas.TOKENS
            };
            let token_data: TokenInterface = {};
            let token: Token = new Token(mmmi_data,token_data);
            await token.getToken({tokenKey: token_key}).then(obj => {
                if(obj[Constants.KEY_DONE] == true && obj['result'] != null) {
                    res.locals.tokenKey = token_key;
                    return next();
                }
                else throw new NotAuthenticatedError("");
            }).catch(err => {
                throw err;
            });
        }//if(token_key){
        else throw new NotAuthenticatedError("");
    }catch(e){
        if(e instanceof NotAuthenticatedError){
            return res.status(401).json({done: false, message: Messages.ERROR_NOTAUTHENTICATED});
        }
        else{
            return res.status(500).json({done: false, message: Messages.ERROR_SERVER});
        }
    }
}