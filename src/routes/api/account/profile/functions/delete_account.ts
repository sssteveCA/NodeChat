import { Request, Response } from "express";
import { Constants } from "../../../../../namespaces/constants";
import { Messages } from "../../../../../namespaces/messages";

export function deleteAccount(req:Request, res: Response){
    if(req.body['password'] && req.body['conf_password']){

    }//if(req.body['password'] && req.body['conf_password']){
    else{
        return res.status(400).json({done: false, msg: Messages.ERROR_MISSINGDATA})
    }
}