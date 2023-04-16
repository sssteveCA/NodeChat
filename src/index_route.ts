import { Request, Response } from "express"
import { Paths } from "./namespaces/paths"
import fs from 'fs/promises'
import mustache from 'mustache'
import path from 'path'
import { Constants } from "./namespaces/constants"


export default async function index_route(req: Request, res: Response){
    console.log(req.session);
    let index = ''
    let links_list: object[] = []
    let scripts_list: object[] = []
    let partial_data: object = {}
    if(req.session[Constants.KEY_USERNAME]){
        index = path.resolve(Paths.ROOTPATH,'dist/views/partials/index_logged.mustache')
        links_list = [
            {rel: 'stylesheet', href: Paths.BOOTSTRAP_CSS},
            {rel: 'stylesheet', href: Paths.JQUERY_UI_CSS},
            {rel: 'stylesheet', href: '/css/logged/index_logged.css'},
            {rel: 'stylesheet', href: '/css/logged/menu_logged.css'},
            {rel: 'stylesheet', href: '/css/footer.css'},
        ]
        scripts_list = [
            {src: Paths.BOOTSTRAP_JS},
            {src: Paths.JQUERY_JS},
            {src: Paths.JQUERY_UI_JS},
            {type: 'module', src: '/js/menu.js'},
            {type: 'module', src: '/js/logged/index_logged.js'},
            {src: '/js/footer.js'},
        ],
        partial_data = {token_key: req.session[Constants.KEY_TOKEN], username: req.session[Constants.KEY_USERNAME]}
    }
    else{
        index = path.resolve(Paths.ROOTPATH,'dist/views/partials/index.mustache')
        links_list = [
            { rel: 'stylesheet', href: Paths.BOOTSTRAP_CSS },
            { rel: 'stylesheet', href: '/css/index.css' },
            { rel: 'stylesheet', href: '/css/menu.css' },
            { rel: 'stylesheet', href: '/css/footer.css' },
        ]
        scripts_list = [
            {src: Paths.BOOTSTRAP_JS},
            {src: Paths.JQUERY_JS},
            {type: 'module', src: '/js/menu.js'},
            {src: '/js/footer.js'},
        ]
    }
    let content = await fs.readFile(index, {encoding: 'utf-8'})
    content = mustache.render(content,partial_data)
    const data = {
        token_key: req.session[Constants.KEY_TOKEN],
        username: req.session[Constants.KEY_USERNAME],
        title: "NodeChat",
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