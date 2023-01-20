import { Request, Response } from "express";
import { SetEmployment, SetEmploymentInterface } from "../../../../../classes/account/update/setemployment";
import { Constants } from "../../../../../namespaces/constants";
import { Messages } from "../../../../../namespaces/messages";

export default function update_employment(req: Request, res: Response){
    try{
        if(req.body["employment"] && req.body["employment"] != ""){
            let empData: SetEmploymentInterface = {
                token_key: res.locals.tokenKey, employment: req.body["employment"].trim()
            }
            let emp: SetEmployment = new SetEmployment(empData);
            emp.setEmployment().then(result => {
                if(result[Constants.KEY_DONE] == true)
                    return res.status(200).json({done: true, msg: "Informazioni sul lavoro aggiornate"});
                else
                    return res.status(500).json({done: false, msg: Messages.ERROR_EMPLOYMENT_UPDATE});
            })
        }//if(req.body["employment"] && req.body["employment"] != ""){
        else
            return res.status(400).json({done: false, msg: Messages.ERROR_MISSINGDATA});
    }catch(e){
        return res.status(500).json({done: false, msg: Messages.ERROR_EMPLOYMENT_UPDATE});
    }
    
}