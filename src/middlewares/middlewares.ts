//Middlewares used in different routes
import express, { NextFunction, Request, Response } from 'express';
import { MongoDbModelManagerInterface } from '../classes/database/mongodbmodelmanager';
import { Schemas } from '../namespaces/schemas';
import {TokenInterface, Token} from '../classes/database/models/token'
import { Messages } from '../namespaces/messages';

/**
 * Pass to the next hop if user is not logged 
 */
 export const guest = (req: Request, res: Response, next: NextFunction) => {
    if(req.session['username'] && req.session['token_key'])
        return res.redirect("/");
    else return next();
};

/**
 * Pass to the next hop if user is logged
 */
export const logged = async(req:Request, res: Response, next: NextFunction) => {
    if(req.session['username'] && req.session['token_key']){
        let username: string = req.session['username'];
        let token_key: string = req.session['token_key'];
        let mongo_mmi: MongoDbModelManagerInterface = {
            collection_name: process.env.MONGODB_TOKENS_COLLECTION as string,
            schema: Schemas.TOKENS
        };
        let token_data: TokenInterface = {};
        let token: Token = new Token(mongo_mmi,token_data);
        await token.getToken({tokenKey: token_key}).then(result => {
            if(result['errno'] == 0 && result['result'] != null){
                let nowTimestamp: number = Date.now();
                let expDate: Date = new Date(result['result']['expireDate']);
                let expTime: number = expDate.getTime();
                console.log("nowTimestamp => "+nowTimestamp);
                console.log("expTime => "+expTime);
                if(nowTimestamp < expTime) return next();
                else{
                    req.session['username'] = null;
                    req.session['token_key'] = null;
                    req.session.destroy(()=>{
                        let message_encoded = encodeURIComponent(Messages.ERROR_SESSIONEXPIRED);
                        return res.redirect("/login?message="+message_encoded);
                    });
                }
            }//if(result['errno'] == 0 && result['result'] != null){
            else return res.redirect("/login");
        }).catch(err => {
            return res.redirect("/login");
        });
    }
    else return res.redirect("/login");
    
}