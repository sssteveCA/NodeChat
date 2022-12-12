import { Request, Response } from "express";
import multiparty from "multiparty";
import { parse } from "path";
import { Messages } from "../../../../namespaces/messages";
import { Paths } from "../../../../namespaces/paths";

export async function upload_cover_image(req: Request, res: Response){
    let tokenKey: string = "";
    let imagePath: string = "";
    let form = new multiparty.Form({
        autoFiles: true, uploadDir: Paths.STATIC_UPLOAD
    });

    form.on('error',()=>{
        return res.status(400).json({
            done: false, msg: Messages.ERROR_COVER_IMAGE
        });
    });

    form.parse(req, (error,fields,files)=>{
        //console.log("Upload profile image parse");
        console.error(error);
        //console.log(fields);
        tokenKey = fields["tokenKey"][0];
        //console.log(files);
        imagePath = files["image"][0]["path"];
    });
}