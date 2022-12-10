import { Request, Response } from "express";
import multiparty from "multiparty";
import { Paths } from "../../../../namespaces/paths";

export async function upload_profile_image(req: Request, res: Response){
    let form = new multiparty.Form({
        uploadDir: Paths.STATIC_UPLOAD
    });

    form.on('aborted',()=>{
        console.error("Upload profile image aborted");
    });

    form.on('close',()=>{
        console.log("Upload profile image close");
        return res.status(200).json({
            done: true, msg: "Upload completato"
        });
    });

    form.on('error',()=>{
        return res.status(400).json({
            done: false, msg: "Errore durante il caricamento dell'immagine del profilo"
        });
    });

    form.on('field',(name,value)=>{
        console.log("Upload profile image field");
        console.log(name);
        console.log(value);
    });

    form.on('file',(name,file)=>{
        console.log("Upload profile image file");
        console.log(name);
        console.log(file);
    });

    form.on('part',(part)=>{
        console.log("Upload profile image part");
        console.log(part);
        part.resume();
    });

    form.on('progress',(bytesReceived, bytesExpected)=>{
        console.log("Upload profile image progress");
        console.log(bytesReceived);
        console.log(bytesExpected);
    })

    form.parse(req,(error,fields,files)=>{
        console.log("Upload profile image parse");
        console.error(error);
        console.log(fields);
        console.log(files);
    });
}