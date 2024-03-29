import { Request, Response } from "express";
import { SetEducation, SetEducationInterface } from "../../../../../../classes/account/update/seteducation";
import { Constants } from "../../../../../../namespaces/constants";
import { Messages } from "../../../../../../namespaces/messages";

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
                if(result[Constants.KEY_DONE] == true)
                    return res.status(200).json({done: true, message: "Informazioni sull'istruzione aggiornate"});
                else 
                    return res.status(500).json({done: false, message: Messages.ERROR_EDUCATION_UPDATE});
            }).catch(err => {
                throw err;
            });
        }//if(isset && notEmpty){
        else 
            return res.status(400).json({done: false, message: Messages.ERROR_MISSINGDATA});
    }catch(e){
        return res.status(500).json({done: false, message: Messages.ERROR_EDUCATION_UPDATE});
    }
}