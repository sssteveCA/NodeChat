import { Request, Response } from "express";
import { Messages } from "../../../../../namespaces/messages";

export default function update_employment(req: Request, res: Response){
    try{
        if(req.body["employment"] && req.body["employment"] != ""){

        }//if(req.body["employment"] && req.body["employment"] != ""){
        else
            return res.status(400).json({done: false, msg: Messages.ERROR_MISSINGDATA});
    }catch(e){

    }
    
}