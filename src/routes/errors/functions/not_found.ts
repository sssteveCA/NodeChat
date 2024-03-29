import { Request, Response } from "express";
import { Paths } from "../../../namespaces/paths";
import path from 'path'
import fs from 'fs/promises'
import mustache from 'mustache'
import { Constants } from "../../../namespaces/constants";

export default async function not_found(req: Request, res: Response){
    let not_found = path.resolve(Paths.ROOTPATH,'dist/views/partials/not_found.mustache')
    let links_list: object[] = [
        {rel: 'stylesheet', href: Paths.BOOTSTRAP_CSS},
        {rel: 'stylesheet', href: '/css/menu.css'},
        {rel: 'stylesheet', href: '/css/error/not_found.css'},
        {rel: 'stylesheet', href: '/css/footer.css'},
    ]
    let scripts_list: object[] = [
        {src: Paths.BOOTSTRAP_JS},
        {src: Paths.JQUERY_JS},
        {type: 'module', src: '/js/menu.js'},
        {src: '/js/footer.js'},
    ]
    let partial_data: object = {}
    if(req.session[Constants.KEY_USERNAME]){
        partial_data = {token_key: req.session[Constants.KEY_TOKEN], username: req.session[Constants.KEY_USERNAME]}
    }
    let content = await fs.readFile(not_found, {encoding: 'utf-8'})
    content = mustache.render(content,partial_data)
    const data = {
        token_key: req.session[Constants.KEY_TOKEN],
        username: req.session[Constants.KEY_USERNAME],
        title: "Pagina non trovata",
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
    return res.status(404).render('layout',data)
}
