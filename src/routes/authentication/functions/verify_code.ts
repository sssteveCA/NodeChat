import { Request, Response } from "express";
import { Subscribe, SubscribeInterface } from "../../../classes/authentication/subscribe";
import { Constants } from "../../../namespaces/constants";
import { Paths } from "../../../namespaces/paths";
import path from 'path'
import fs from 'fs/promises'
import mustache from 'mustache'

export async function verify_code(req:Request, res: Response){

    let code = req.params.code;
    let status_code: number = 200;

    let verify_code = path.resolve(Paths.ROOTPATH,'dist/views/partials/verify_code.mustache')
    let links_list: object[] = [
        {rel: 'stylesheet', href: Paths.BOOTSTRAP_CSS},
        {rel: 'stylesheet', href: '../css/menu.css'},
        {rel: 'stylesheet', href: '../css/code_verify.css'},
        {rel: 'stylesheet', href: '../css/footer.css'},
    ]
    let scripts_list: object[] = [
        {src: Paths.BOOTSTRAP_JS},
        {src: Paths.JQUERY_JS},
        {src: 'js/login.js'},
        {type: 'module', src: '../js/menu.js'},
        {src: '../js/footer.js'},
    ]
    let partial_data: object = {}
    let sb_data: SubscribeInterface = {
        activation_code: code
    };
    let sb: Subscribe = new Subscribe(sb_data);
    await sb.activateAccount().then(obj => {
        partial_data = {
            verify_response : obj[Constants.KEY_MESSAGE],
            status_code: obj[Constants.KEY_CODE]
        }
    });
    let content = await fs.readFile(verify_code, {encoding: 'utf-8'})
    content = mustache.render(content,partial_data)
    const data = {
        title: "Verifica il tuo account",
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
    return res.status(status_code).render('layout',data)
}