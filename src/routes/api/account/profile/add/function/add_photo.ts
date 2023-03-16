import { Request, Response } from "express";
import multiparty from "multiparty";
import { AddUserPhoto, AddUserPhotoInterface } from "../../../../../../classes/account/upload/adduserphoto";
import { General } from "../../../../../../classes/general";
import { Constants } from "../../../../../../namespaces/constants";
import { Messages } from "../../../../../../namespaces/messages";
import { Paths } from "../../../../../../namespaces/paths";


export async function add_photo(req: Request, res: Response){
    let tokenKey: string = "";
    let photoPath: string = "";
    let fileName: string = "";
    let form = new multiparty.Form({
        autoFiles: true,
        uploadDir: Paths.STATIC_UPLOAD
    });

    form.on('error',()=>{
        return res.status(400).json({
            done: false,
            message: Messages.ERROR_ADD_PHOTO
        })
    })

    form.parse(req, (error, fields, files) => {
        tokenKey = General.getAuthToken(req);
        photoPath = files["photo"][0]["path"];
        fileName = files["photo"][0]["originalFilename"];
        console.log("add_photo fields");
        console.log(fields);
        console.log("add_photo files");
        console.log(files);
        const aupData: AddUserPhotoInterface = {
            filename: fileName, photo_path: photoPath, token_key: tokenKey
        }
        const aup: AddUserPhoto = new AddUserPhoto(aupData);
        aup.addPhoto().then(result => {
            console.log("add_photo addPhoto result => ");
            console.log(result);
            if(result[Constants.KEY_DONE] == true){
                return res.status(201).json({ dest: result["dest"], done: true, message: "Immagine caricata correttamente"});
            }
            else{
                return res.status(500).json({
                    done: false, message: Messages.ERROR_ADD_PHOTO
                });
            }
        })
        

    })
}