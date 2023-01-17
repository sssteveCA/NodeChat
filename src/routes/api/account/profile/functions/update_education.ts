import { Request, Response } from "express";
import { SetEducation, SetEducationInterface } from "../../../../../classes/account/update/seteducation";
import { Messages } from "../../../../../namespaces/messages";

export default function update_education(req: Request, res: Response){
    let isset: boolean = (req.body["secondary_school"] && req.body["university"]);
    let notEmpty: boolean = (req.body["secondary_school"] != "" && req.body["university"] != "");
    try{
        if(isset && notEmpty){
            let seData: SetEducationInterface = {
                token_key: res.locals.tokenKey,
                secondary_school: req.body["secondary_school"].trim(),
                university: req.body["university"].trim()
            }
            let se: SetEducation = new SetEducation(seData);
            se.setEducation().then(result => {
                if(result["done"] == true)
                    return res.status(200).json({done: true, msg: "Informazioni sull'istruzione aggiornate"});
                else throw new Error;
            }).catch(err => {
                throw err;
            });
        }//if(isset && notEmpty){
        else 
            return res.status(400).json({done: false, msg: Messages.ERROR_MISSINGDATA});
    }catch(e){
        return res.status(500).json({done: false, msg: Messages.ERROR_EDUCATION_UPDATE});
    }
}