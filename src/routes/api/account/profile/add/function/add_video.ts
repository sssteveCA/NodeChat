import { Request, Response } from "express";
import multiparty from "multiparty";
import { Paths } from "../../../../../../namespaces/paths";
import { Messages } from "../../../../../../namespaces/messages";
import { General } from "../../../../../../classes/general";
import { AddUserVideo, AddUserVideoInterface } from "../../../../../../classes/account/upload/adduservideo";
import { Constants } from "../../../../../../namespaces/constants";

export async function add_video(req: Request, res: Response){
    let tokenKey: string = "";
    let videoPath: string = "";
    let fileName: string = "";
    let form = new multiparty.Form({
        autoFiles: true,
        uploadDir: Paths.STATIC_UPLOAD
    });

    form.on('error',()=>{
        return res.status(400).json({
            done: false,
            message: Messages.ERROR_ADD_VIDEO
        })
    })

    form.parse(req, (error, fields, files) => {
      tokenKey = General.getAuthToken(req);
      videoPath = files["video"][0]["path"];
      fileName = files["video"][0]["originalFilename"];
      const auvData: AddUserVideoInterface = {
        filename: fileName, video_path: videoPath, token_key: tokenKey
      }
      const auv: AddUserVideo = new AddUserVideo(auvData);
      auv.addVideo().then(result => {
        if(result[Constants.KEY_DONE] == true){
            return res.status(201).json({ dest: result["dest"], done: true, message: "Video caricato correttamente"});
        }
        else{
            return res.status(500).json({
                done: false, message: Messages.ERROR_ADD_VIDEO
            });
        }
      })

    })
}