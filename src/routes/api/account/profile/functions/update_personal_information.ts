import { Request, Response } from "express";
import { SetPersonalInformation, SetPersonalInformationInterface } from "../../../../../classes/account/update/setpersonalinformation";
import { Messages } from "../../../../../namespaces/messages";

export function update_personal_information(req: Request, res: Response){
    //let isset: boolean = (req.body["name"] && req.body["surname"] && req.body["sex"] &&   )
    try{
        let spiData: SetPersonalInformationInterface = {
            token_key: res.locals.tokenKey,
            name: req.body["name"], surname: req.body["surname"], sex: req.body["sex"], 
            birth_date: req.body["birth_date"], birth_place: req.body["birth_place"], 
            living_place: req.body["living_place"]
        }
        let spi: SetPersonalInformation = new SetPersonalInformation(spiData);
        spi.setPersonalInformation().then(result => {
            if(result["done"] == true)
                return res.status(200).json({done: true, msg: "Informazioni personali aggiornate"});
            else
                return res.status(500).json({done: false, msg: Messages.ERROR_PERSONALINFORMATION_UPDATE});
        });
        throw new Error;
    }catch(e){
        return res.status(500).json({done: false, msg: Messages.ERROR_PERSONALINFORMATION_UPDATE});
    }
    
}