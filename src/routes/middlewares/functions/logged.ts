import { NextFunction, Request, Response } from "express";
import { Token, TokenInterface } from "../../../classes/database/models/token";
import { MongoDbModelManagerInterface } from "../../../classes/database/mongodbmodelmanager";
import { Schemas } from "../../../namespaces/schemas";

export async function loggedMiddleware(req: Request, res: Response, next: NextFunction){
    let redirect_string: string = "/login";
    let next_hop: boolean = false;
    if(req.session['username'] && req.session['token_key']){
        let token_key: string = req.session['token_key'];
        let mongo_mmi: MongoDbModelManagerInterface = {
            collection_name: process.env.MONGODB_TOKENS_COLLECTION as string,
            schema: Schemas.TOKENS
        };
        let token_data: TokenInterface = {};
        let token: Token = new Token(mongo_mmi,token_data);
        await token.getToken({tokenKey: token_key}).then(result => {
            if(result['done'] == true && result['result'] != null){
                let nowTimestamp: number = Date.now();
                let expDate: Date = new Date(result['result']['expireDate']);
                let expTime: number = expDate.getTime();
                next_hop = true;
            }//if(result['done'] == true && result['result'] != null){
            else redirect_string = "/login";
        }).catch(err => {
            redirect_string = "/login";
        });
        if(next_hop)
        {
            res.locals.tokenKey = req.session['token_key'];
            return next();
        }
        //console.log("Before delete token");
        await token.deleteToken({tokenKey: token_key});
        req.session['username'] = null;
        req.session['token_key'] = null;
        req.session.destroy(()=>{
            return res.redirect(redirect_string);
        });
    }//if(req.session['username'] && req.session['token_key']){
    else return res.redirect(redirect_string);
} 