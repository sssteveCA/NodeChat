import { Request, Response } from "express";
import { Messages } from "../../../../../namespaces/messages";

export default function update_education(req: Request, res: Response){
    let isset: boolean = (req.body["secondary_school"] && req.body["university"]);
    let notEmpty: boolean = (req.body["secondary_school"] != "" && req.body["university"] != "");
    try{
        if(isset && notEmpty){

        }//if(isset && notEmpty){
        else 
            return res.status(400).json({done: false, msg: Messages.ERROR_MISSINGDATA});
    }catch(e){
        return res.status(500).json({done: false, msg: Messages.ERROR_EDUCATION_UPDATE});
    }
}