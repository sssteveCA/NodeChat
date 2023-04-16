import { Request, Response } from "express";
import { Subscribe, SubscribeInterface } from "../../../classes/authentication/subscribe";
import { Constants } from "../../../namespaces/constants";
import { Paths } from "../../../namespaces/paths";
import path from 'path'
import fs from 'fs/promises'
import mustache from 'mustache'

export async function subscribe_get(req: Request, res: Response){
    let subscribe_get = path.resolve(Paths.ROOTPATH,'dist/views/partials/subscribe.mustache')
    let links_list: object[] = [
        {rel: 'stylesheet', href: Paths.BOOTSTRAP_CSS},
        {rel: 'stylesheet', href: Paths.JQUERY_UI_CSS},
        {rel: 'stylesheet', href: 'css/subscribe.css'},
        {rel: 'stylesheet', href: 'css/menu.css'},
        {rel: 'stylesheet', href: 'css/footer.css'},
    ]
    let scripts_list: object[] = [
        {src: Paths.BOOTSTRAP_JS},
        {src: Paths.JQUERY_JS},
        {src: Paths.JQUERY_UI_JS},
        {type: 'module', src: 'js/menu.js'},
        {type: 'module', src: 'js/subscribe.js'},
        {src: 'js/footer.js'},
    ]
    let partial_data: object = { subscribe: Paths.SUBSCRIBE }
    let content = await fs.readFile(subscribe_get, {encoding: 'utf-8'})
    content = mustache.render(content,partial_data)
    const data = {
        title: "Registrati",
        links: {
            list: links_list,
            link: function(){ return `<link rel="${(<any>this).rel}" href="${(<any>this).href}">`; }
        },
        scripts: {
            list: scripts_list,
            script: function(){
                const type = ('type' in (<any>this)) ? (<any>this).type : "";
                return `<script type="${type}" src="${(<any>this).src}"></script>`;
            }
        },
        content : content
    };
    return res.render('layout',data)
}


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