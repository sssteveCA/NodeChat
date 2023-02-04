import { Request, Response } from "express";

export default function preferences_set(req: Request, res: Response){
    if(req.body['option'] && req.body['option'] != ''){
        let option: string = req.body['option'];
        if(['accepted','rejected'].includes(option)){
            res.cookie('preferences',option);
        }
    }
    return res.status(400).json({ done: false});
}