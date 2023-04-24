import { Request, Response } from "express";
import multiparty from "multiparty";
import { SetProfileImageFolder, SetProfileImageFolderInterface } from "../../../../../../classes/account/upload/setprofileimagefolder";
import { Paths } from "../../../../../../namespaces/paths";
import { Messages } from "../../../../../../namespaces/messages";
import { Constants } from "../../../../../../namespaces/constants";
import { General } from "../../../../../../classes/general";

export async function upload_profile_image(req: Request, res: Response){
    let tokenKey: string = "";
    let imagePath: string = "";
    let form = new multiparty.Form({
        autoFiles: true,
        uploadDir: Paths.STATIC_UPLOAD
    });

    form.on('aborted',()=>{
        //console.error("Upload profile image aborted");
    });

    form.on('close',()=>{
    });

    form.on('error',()=>{
        return res.status(400).json({
            done: false, message: Messages.ERROR_PROFILE_IMAGE
        });
    });

    form.on('field',(name,value)=>{
    });

    form.on('file',(name,file)=>{
    });

    form.on('part',(part)=>{
        part.resume();
    });

    form.on('progress',(bytesReceived, bytesExpected)=>{
    })

    form.parse(req,(error,fields,files)=>{
        console.error(error);
        tokenKey = General.getAuthToken(req);
        imagePath = files["image"][0]["path"];
        const spifData: SetProfileImageFolderInterface = {
            image_path: imagePath, token_key: tokenKey
        };
        const spif: SetProfileImageFolder = new SetProfileImageFolder(spifData);
        spif.setFolder().then(result => {
            if(result[Constants.KEY_DONE] == true){
                return res.status(200).json({ dest: result["dest"], done: true, message: "Upload completato" });
            }
            else{
                return res.status(500).json({done: false, message: Messages.ERROR_PROFILE_IMAGE });
            }
        });
    });
}