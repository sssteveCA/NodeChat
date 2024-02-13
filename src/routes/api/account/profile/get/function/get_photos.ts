import { Request, Response } from "express";
import { GetPhotos, GetPhotosInterface } from "../../../../../../classes/account/get/getphotos";
import { Constants } from "../../../../../../namespaces/constants";
import { Messages } from "../../../../../../namespaces/messages";

export default function get_photos(req: Request, res: Response){
    try{
        let gpData: GetPhotosInterface = {
            token_key: res.locals.tokenKey
        }
        let gp: GetPhotos = new GetPhotos(gpData);
        gp.getPhotos().then(result => {
            if(result[Constants.KEY_DONE] == true){
                return res.status(200).json(result);
            }
            else{
                let code: number = 500;
                if(gp.errno == GetPhotos.ERR_ACCOUNT_ID)code = 401;
                return res.status(code).json({
                    done: false, message: Messages.ERROR_PHOTOS_GET
                });
            } 
        })
    }catch(e){
        return res.status(500).json({
            done: false, message: Messages.ERROR_PHOTOS_GET
        });
    }
}