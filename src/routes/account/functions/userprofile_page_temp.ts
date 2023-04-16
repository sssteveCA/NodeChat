import { Request, Response } from "express";
import { Account, AccountInterface } from "../../../classes/database/models/account";
import { MongoDbModelManagerInterface } from "../../../classes/database/mongodbmodelmanager";
import { Constants } from "../../../namespaces/constants";
import { Paths } from "../../../namespaces/paths";
import { Schemas } from "../../../namespaces/schemas";
import path from 'path'
import fs from 'fs/promises'
import mustache from 'mustache'

export async function userprofile_page_temp(req: Request, res: Response){

    let username_inserted: string = req.params.username;
    let current_username: string = req.session[Constants.KEY_USERNAME];
    let template = ''
    let title = ''
    let links_list: object[] = [
        {rel: 'stylesheet', href: Paths.BOOTSTRAP_CSS},
        {rel: 'stylesheet', href: Paths.JQUERY_UI_CSS},
        {rel: 'stylesheet', href: '../css/logged/menu_logged.css'},
        {rel: 'stylesheet', href: '../css/footer.css'},
    ]
    let scripts_list: object[] = [
        {src: Paths.BOOTSTRAP_JS},
        {src: Paths.JQUERY_JS},
        {src: Paths.JQUERY_UI_CSS},
        {type: 'module', src: '../js/menu.js'},
        {src: '../js/footer.js'},
    ]
    let partial_data: object = {}
    if(username_inserted == current_username){
        title = "Il tuo profilo";
        partial_data = Object.assign(partial_data,{
            token_key: res.locals["tokenKey"]
        })
        links_list = [
            ...links_list,
            {rel: 'stylesheet', href: '../bootstrap-icons/font/bootstrap-icons.css'},
            {rel: 'stylesheet', href: '../css/logged/profile.css'},
        ]
        scripts_list = [
            ...scripts_list,
            {type: 'module', src: '../js/logged/profile.js'}
        ]
        template = path.resolve(Paths.ROOTPATH,'dist/views/partials/profile.mustache')
    }
    else{
        let mmi_data: MongoDbModelManagerInterface = {
            collection_name: process.env.MONGODB_ACCOUNTS_COLLECTION as string,
            schema: Schemas.ACCOUNTS 
        };
        let ac_data: AccountInterface = {};
        let ac: Account = new Account(mmi_data,ac_data);
        await ac.getAccount({username: username_inserted}).then(obj =>{
            if(obj['result'] != null){
                //Account found
                partial_data[Constants.KEY_TOKEN] = res.locals["tokenKey"];
                partial_data["user_id"] = ac.id;
            }//if(obj['result'] != null){
            else{
                //Account not found
                return res.redirect('/not_found');
            }
        }).catch(err => {
            //Server error
            return res.redirect('/server_error');
        });
        title = username_inserted;
        partial_data = Object.assign(partial_data,{username_profile: username_inserted
        })
        links_list = [
            ...links_list,
            {rel: 'stylesheet', href: '../css/logged/user_profile.css'},
        ]
        scripts_list = [
            ...scripts_list,
            {type: 'module', src: '../js/logged/user_profile.js'}
        ]
        template = path.resolve(Paths.ROOTPATH,'dist/views/partials/user_profile.mustache')
    }

    let content = await fs.readFile(template, {encoding: 'utf-8'})
    content = mustache.render(content,partial_data)
    const data = {
        title: title,
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