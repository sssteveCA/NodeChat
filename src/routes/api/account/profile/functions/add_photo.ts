import { Request, Response } from "express";
import multiparty from "multiparty";
import { Messages } from "../../../../../namespaces/messages";
import { Paths } from "../../../../../namespaces/paths";


export async function add_photo(req: Request, res: Response){
    let tokenKey: string = "";
    let imagePath: string = "";
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
        tokenKey = fields["tokenKey"][0];
        imagePath = fields["imagePath"][0];
    })
}