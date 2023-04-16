import { Request, Response } from "express";
import path from 'path'
import fs from 'fs/promises'
import mustache from 'mustache'
import CookiePolicy from "../../../policies/cookiepolicy";
import { Paths } from "../../../namespaces/paths";
import PrivacyPolicy from "../../../policies/privacypolicy";
import TermsAndConditions from "../../../policies/termsandconditions";
import { Constants } from "../../../namespaces/constants";

export default async function policy_document(req: Request, res: Response){

    let cookie_policy_view = path.resolve(Paths.ROOTPATH,'dist/views/partials/policy_document.mustache')
    let links_list: object[] = [
        {rel: 'stylesheet', href: Paths.BOOTSTRAP_CSS},
        {rel: 'stylesheet', href: Paths.JQUERY_UI_CSS},
        {rel: 'stylesheet', href: 'css/terms.css'},
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
    switch(req.path){
        case '/cookie_policy':
            partial_data = { document: CookiePolicy.getDocument()}
            break;
        case '/privacy_policy':
            partial_data = { document: PrivacyPolicy.getDocument()}
            break;
        default:
            partial_data = { document: TermsAndConditions.getDocument()}
            break;
    }
    if(req.session[Constants.KEY_USERNAME]){
        partial_data = Object.assign(partial_data, {token_key: req.session[Constants.KEY_TOKEN], username: req.session[Constants.KEY_USERNAME]} )
    }
    let content = await fs.readFile(cookie_policy_view, {encoding: 'utf-8'})
    content = mustache.render(content,partial_data)
    const data = {
        token_key: req.session[Constants.KEY_TOKEN],
        username: req.session[Constants.KEY_USERNAME],
        title: "Cookie Policy",
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