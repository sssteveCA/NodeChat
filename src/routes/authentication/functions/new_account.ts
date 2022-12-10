import { Request, Response } from "express";
import { Subscribe, SubscribeInterface } from "../../../classes/authentication/subscribe";
import { Paths } from "../../../namespaces/paths";

export function new_account(req: Request, res: Response){
    let body: object = req.body as object;
    let home_url: string = process.env.MAIN_URL+Paths.VERIFY as string;
    //console.log("home_url => "+home_url);
    let subscribe_data: SubscribeInterface = {
        name: body['name'], surname: body['surname'], username: body['username'],
        email: body['email'], password: body['password'], home_url: home_url
    };
    let subscribe: Subscribe = new Subscribe(subscribe_data);
    subscribe.insertNewAccount().then(obj => {
        return res.status(obj['code']).json(obj);
    }).catch(err => {
        return res.status(500).send(err);
    });
}