import { Request, Response } from "express";
import { SetPersonalInformation, SetPersonalInformationInterface } from "../../../../../../classes/account/update/setpersonalinformation";
import { Constants } from "../../../../../../namespaces/constants";
import { Messages } from "../../../../../../namespaces/messages";

export default function update_personal_information(req: Request, res: Response){
    let isset: boolean = (req.body["name"] && req.body["surname"] && req.body["sex"] && req.body["birth_date"] && req.body["birth_place"] && req.body["living_place"]);
    let notEmpty: boolean = (req.body["name"] != "" && req.body["surname"] != "" && req.body["sex"] != "" && req.body["birth_date"] != "" && req.body["birth_place"] != "" && req.body["living_place"] != "");
    let sexValueOk: boolean = ['F','M','Femmina','Maschio'].some((item)=> {
        return req.body["sex"].toUpperCase() == item.toUpperCase();
    });
    try{
        if(isset && notEmpty){
            if(sexValueOk){
                let spiData: SetPersonalInformationInterface = {
                    token_key: res.locals.tokenKey,
                    name: req.body["name"].trim(), surname: req.body["surname"].trim(), sex: req.body["sex"].trim(), 
                    birth_date: req.body["birth_date"].trim(), birth_place: req.body["birth_place"].trim(), 
                    living_place: req.body["living_place"].trim()
                }
                let spi: SetPersonalInformation = new SetPersonalInformation(spiData);
                spi.setPersonalInformation().then(result => {
                    if(result[Constants.KEY_DONE] == true)
                        return res.status(200).json({done: true, message: "Informazioni personali aggiornate"});
                    else
                        return res.status(500).json({done: false, message: Messages.ERROR_PERSONALINFORMATION_UPDATE});
                });
            }//if(sexValueOk){
            else
                return res.status(400).json({done: false, message: Messages.ERROR_INCORRECTFORMAT});
        }//if(isset && notEmpty){
        else
            return res.status(400).json({done: false, message: Messages.ERROR_MISSINGDATA});
    }catch(e){
        return res.status(500).json({done: false, message: Messages.ERROR_PERSONALINFORMATION_UPDATE});
    }
}