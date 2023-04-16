import { Request, Response } from "express";
import { Subscribe, SubscribeInterface } from "../../../classes/authentication/subscribe";
import { Constants } from "../../../namespaces/constants";
import { Paths } from "../../../namespaces/paths";


export function subscribe_post(req: Request, res: Response){
    let body: object = req.body as object;
    let home_url: string = process.env.MAIN_URL+Paths.VERIFY as string;
    //console.log("home_url => "+home_url);
    let subscribe_data: SubscribeInterface = {
        name: body['name'], surname: body['surname'], username: body['username'],
        email: body['email'], password: body['password'], home_url: home_url
    };
    let subscribe: Subscribe = new Subscribe(subscribe_data);
    subscribe.insertNewAccount().then(obj => {
        return res.status(obj[Constants.KEY_CODE]).json(obj);
    }).catch(err => {
        return res.status(500).send(err);
    });
}