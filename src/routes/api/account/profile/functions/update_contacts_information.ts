import { Request, Response } from "express";
import { SetContactsInformation, SetContactsInformationInterface } from "../../../../../classes/account/update/setcontactsinformation";
import { General } from "../../../../../classes/general";
import { Messages } from "../../../../../namespaces/messages";
import { Regexs } from "../../../../../namespaces/regex";

export default function update_contacts_information(req: Request, res: Response){
    let isset: boolean = (req.body["email"] && req.body["telephone"]);
    let notEmpty: boolean = (req.body["email"] != "" && req.body["telephone"] != "");
    try{
        if(isset && notEmpty){
            let emailOk: boolean = General.patternMatch(Regexs.EMAIL,req.body["email"]);
            if(emailOk){
                let sciData: SetContactsInformationInterface = {
                    token_key: res.locals.tokenKey,
                    email: req.body["email"].trim(),
                    telephone: req.body["telephone"].trim()
                }
                let sci: SetContactsInformation = new SetContactsInformation(sciData);
                sci.setContactsInformation().then(result => {
                    if(result["done"] == true)
                        return res.status(200).json({done: true, msg: "Informazioni di contatto aggiornate"});
                    else
                        return res.status(500).json({done: false, msg: Messages.ERROR_CONTACTSINFORMATION_UPDATE});
                });
            }//if(emailOk){
            else
                return res.status(400).json({done: false, msg: Messages.ERROR_INCORRECTFORMAT});
        }//if(isset && notEmpty){
        else
            return res.status(400).json({done: false, msg: Messages.ERROR_MISSINGDATA});
    }catch(e){
        return res.status(500).json({done: false, msg: Messages.ERROR_CONTACTSINFORMATION_UPDATE});
    }
}