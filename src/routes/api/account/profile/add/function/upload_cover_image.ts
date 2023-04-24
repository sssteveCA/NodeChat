import { Request, Response } from "express";
import multiparty from "multiparty";
import { SetCoverImageFolder, SetCoverImageFolderInterface } from "../../../../../../classes/account/upload/setcoverimagefolder";
import { General } from "../../../../../../classes/general";
import { Constants } from "../../../../../../namespaces/constants";
import { Messages } from "../../../../../../namespaces/messages";
import { Paths } from "../../../../../../namespaces/paths";

export async function upload_cover_image(req: Request, res: Response){
    let tokenKey: string = "";
    let imagePath: string = "";
    let form = new multiparty.Form({
        autoFiles: true, uploadDir: Paths.STATIC_UPLOAD
    });

    form.on('error',()=>{
        return res.status(400).json({
            done: false, message: Messages.ERROR_COVER_IMAGE
        });
    });

    form.parse(req, (error,fields,files)=>{
        console.error(error);
        tokenKey = General.getAuthToken(req);
        imagePath = files["image"][0]["path"];
        const scifData: SetCoverImageFolderInterface = {
            image_path: imagePath, token_key: tokenKey
        };
        const scif: SetCoverImageFolder = new SetCoverImageFolder(scifData);
        scif.setFolder().then(result => {
            if(result[Constants.KEY_DONE] == true){
                return res.status(200).json({ dest: result["dest"], done: true, message: "Upload completato" });
            }
            else{
                return res.status(500).json({done: false, message: Messages.ERROR_COVER_IMAGE });
            }
        });
    });
}