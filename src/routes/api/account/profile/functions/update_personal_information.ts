import { Request, Response } from "express";
import { SetPersonalInformation, SetPersonalInformationInterface } from "../../../../../classes/account/update/setpersonalinformation";
import { Messages } from "../../../../../namespaces/messages";

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
                    name: req.body["name"], surname: req.body["surname"], sex: req.body["sex"], 
                    birth_date: req.body["birth_date"], birth_place: req.body["birth_place"], 
                    living_place: req.body["living_place"]
                }
                /* console.log("update_personal_information spiData => ");
                console.log(spiData); */
                let spi: SetPersonalInformation = new SetPersonalInformation(spiData);
                spi.setPersonalInformation().then(result => {
                    /* console.log("update_personal_information setPersonalInformation result => ");
                    console.log(result); */
                    if(result["done"] == true)
                        return res.status(200).json({done: true, msg: "Informazioni personali aggiornate"});
                    else
                        return res.status(500).json({done: false, msg: Messages.ERROR_PERSONALINFORMATION_UPDATE});
                });
            }//if(sexValueOk){
            else
                return res.status(400).json({done: false, msg: Messages.ERROR_INCORRECTFORMAT});
        }//if(isset && notEmpty){
        else
            return res.status(400).json({done: false, msg: Messages.ERROR_MISSINGDATA});
    }catch(e){
        return res.status(500).json({done: false, msg: Messages.ERROR_PERSONALINFORMATION_UPDATE});
    }
}