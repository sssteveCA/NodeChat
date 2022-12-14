import { NextFunction, Request, Response } from "express";
import { Token, TokenInterface } from "../../../../classes/database/models/token";
import { MongoDbModelManagerInterface } from "../../../../classes/database/mongodbmodelmanager";
import { NotAuthenticatedError } from "../../../../classes/errors/notauthenticatederror";
import { Messages } from "../../../../namespaces/messages";
import { Schemas } from "../../../../namespaces/schemas";

export async function loggedApiMiddleware(req: Request, res: Response, next: NextFunction){
    let token_key: string = req.body['token_key'] ? req.body['token_key'] : null;
    //console.log("middlewares_api loggedApi token_key => "+token_key);
    try{
        if(token_key){
            let mmmi_data: MongoDbModelManagerInterface = {
                collection_name: process.env.MONGODB_TOKENS_COLLECTION as string, schema: Schemas.TOKENS
            };
            let token_data: TokenInterface = {};
            let token: Token = new Token(mmmi_data,token_data);
            await token.getToken({tokenKey: token_key}).then(obj => {
                if(obj['done'] == true && obj['result'] != null) {
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
            return res.status(401).json({done: false, msg: Messages.ERROR_NOTAUTHENTICATED});
        }
        else{
            return res.status(500).json({done: false, msg: Messages.ERROR_SERVER});
        }
    }
}