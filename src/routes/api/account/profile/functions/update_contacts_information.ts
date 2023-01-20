import { Request, Response } from "express";
import { Messages } from "../../../../../namespaces/messages";

export default function update_contacts_information(req: Request, res: Response){
    let isset: boolean = (req.body["email"] && req.body["telephone"]);
    let notEmpty: boolean = (req.body["email"] != "" && req.body["telephone"] != "");
    try{
        if(isset && notEmpty){

        }//if(isset && notEmpty){
        else
            return res.status(400).json({done: false, msg: Messages.ERROR_MISSINGDATA});
    }catch(e){
        return res.status(500).json({done: false, msg: Messages.ERROR_CONTACTSINFORMATION_UPDATE});
    }
}