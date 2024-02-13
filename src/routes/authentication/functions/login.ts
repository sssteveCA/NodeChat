import { Request, Response } from "express";
import { Login, LoginInterface } from "../../../classes/authentication/login";
import { Constants } from "../../../namespaces/constants";
import { Paths } from "../../../namespaces/paths";
import path from 'path'
import fs from 'fs/promises'
import mustache from 'mustache'

export async function login_get(req: Request, res: Response){
    let message: string|null = (req.query.message != null) ? req.query.message as string : null;
    let login_get = path.resolve(Paths.ROOTPATH,'dist/views/partials/login.mustache')
    let links_list: object[] = [
        {rel: 'stylesheet', href: Paths.BOOTSTRAP_CSS},
        {rel: 'stylesheet', href: '/css/login.css'},
        {rel: 'stylesheet', href: '/css/menu.css'},
        {rel: 'stylesheet', href: '/css/footer.css'},
    ]
    let scripts_list: object[] = [
        {src: Paths.BOOTSTRAP_JS},
        {src: Paths.JQUERY_JS},
        {src: '/js/login.js'},
        {type: 'module', src: '/js/menu.js'},
        {src: '/js/footer.js'},
    ]
    let partial_data: object = {
        login: Paths.LOGIN, message: message, subscribe: Paths.SUBSCRIBE
    }
    let content = await fs.readFile(login_get, {encoding: 'utf-8'})
    content = mustache.render(content,partial_data)
    const data = {
        title: "Login",
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

export function login_post(req: Request, res: Response){
    let username: string = req.body.username;
    let login_data: LoginInterface = {
        accountId: res.locals.accountId
    };
    let login: Login = new Login(login_data);
    login.login().then(obj => {
        if(obj[Constants.KEY_DONE] == true){
            req.session[Constants.KEY_USERNAME] = username;
            req.session[Constants.KEY_TOKEN] = obj[Constants.KEY_TOKEN];
            return res.redirect("/");
        }
        let msg_encoded: string = encodeURIComponent(obj[Constants.KEY_MESSAGE]);
        return res.redirect('/login?message='+msg_encoded);  
         
    });
}

export async function logout(req: Request, res: Response){
    if(req.session[Constants.KEY_USERNAME])req.session[Constants.KEY_USERNAME] = null;
    if(req.session[Constants.KEY_TOKEN])req.session[Constants.KEY_TOKEN] = null;
    req.session.destroy(()=>{
        return res.redirect("/");
    }); 
}