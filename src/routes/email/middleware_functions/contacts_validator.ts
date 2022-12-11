import { NextFunction, Request, Response } from "express";
import { Messages } from "../../../namespaces/messages";
import { Regexs } from "../../../namespaces/regex";


export function contactsValidatorMiddleware(req: Request, res: Response, next: NextFunction){
    let body: object = req.body as object;
    if(body != null){
        if(body.hasOwnProperty('name') && body.hasOwnProperty('email') && body.hasOwnProperty('subject') && body.hasOwnProperty('message')){
            let valid: boolean = true;
            for(const [key,value] of Object.entries(body)){
                if(value == ''){
                    valid = false;
                    break;
                }
                if(key == 'email'){
                    let regex: RegExp = new RegExp(Regexs.EMAIL);
                    if(!regex.test(value)){
                        valid = false;
                        break;
                    }
                }//if(key == 'email'){
            }//for(const [key,value] of Object.entries(body)){
            if(valid == true) return next();
            return res.status(400).send({done: false, msg: Messages.ERROR_INCORRECTFORMAT});
        }//if(body.hasOwnProperty('name') && body.hasOwnProperty('email') && body.hasOwnProperty('subject') && body.hasOwnProperty('message')){ 
    }//if(body != null){
    return res.status(400).send({done: false, msg: Messages.ERROR_MISSINGDATA});
}