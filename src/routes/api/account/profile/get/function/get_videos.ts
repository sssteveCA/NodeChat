import { Request, Response } from "express";
import { Messages } from "../../../../../../namespaces/messages";
import { GetVideos, GetVideosInterface } from "../../../../../../classes/account/get/getvideos";
import { Constants } from "../../../../../../namespaces/constants";

export default function get_videos(req: Request, res: Response){
    try{
        let gvData: GetVideosInterface = {
            token_key: res.locals.tokenKey
        }
        let gv: GetVideos = new GetVideos(gvData);
        gv.getVideos().then(result => {
            if(result[Constants.KEY_DONE] == true){
                return res.status(200).json(result);
            }
            else{
                let code: number = 500;
                if(gv.errno == GetVideos.ERR_ACCOUNT_ID) code = 401;
                return res.status(code).json({
                    done: false, message: Messages.ERROR_VIDEOS_GET
                });
            }
        })
    }catch(e){
        return res.status(500).json({
            done: false, message: Messages.ERROR_VIDEOS_GET
        })
    }
}