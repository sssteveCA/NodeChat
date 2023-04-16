import { Request, Response } from "express"
import { Paths } from "../../../namespaces/paths"
import { Constants } from "../../../namespaces/constants"
import path from 'path'
import fs from 'fs/promises'
import mustache from 'mustache'

export async function about_us(req: Request, res: Response){
    let about_us = path.resolve(Paths.ROOTPATH,'dist/views/partials/about_us.mustache')
    let links_list: object[] = [
        {rel: 'stylesheet', href: Paths.BOOTSTRAP_CSS},
        {rel: 'stylesheet', href: Paths.JQUERY_UI_CSS},
        {rel: 'stylesheet', href: 'css/aboutus.css'},
        {rel: 'stylesheet', href: 'css/menu.css'},
        {rel: 'stylesheet', href: 'css/footer.css'},
    ]
    let scripts_list: object[] = [
        {src: Paths.BOOTSTRAP_JS},
        {src: Paths.JQUERY_JS},
        {src: Paths.JQUERY_UI_JS},
        {type: 'module', src: 'js/menu.js'},
        {src: 'js/footer.js'},
    ]
    let partial_data: object = {}
    if(req.session['username']){
        partial_data = {token_key: req.session['token_key'], username: req.session['username']}
    }
    let content = await fs.readFile(about_us, {encoding: 'utf-8'})
    content = mustache.render(content,partial_data)
    const data = {
        session: req.session,
        title: "Chi siamo",
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