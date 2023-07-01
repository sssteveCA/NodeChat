import { Request, Response } from "express";
import { Messages } from "../../../../../../namespaces/messages";

export default function get_videos(req: Request, res: Response){
    try{
        return res.status(200).json({
            done: true, message: "OK"
        })
    }catch(e){
        return res.status(500).json({
            done: false, message: Messages.ERROR_VIDEOS_GET
        })
    }
}