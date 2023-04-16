import { Request, Response } from "express";
import path from 'path'
import fs from 'fs/promises'
import mustache from 'mustache'
import { Paths } from "../../../namespaces/paths";
import { Constants } from "../../../namespaces/constants";

export async function contacts(req: Request,res: Response){
    let username: string = req.session['username'] ? req.session['username'] : null;
    let guest: boolean = !username ? true : false;
    return res.render('contacts',{
        bootstrap_css: Paths.BOOTSTRAP_CSS, 
        bootstrap_js: Paths.BOOTSTRAP_JS, 
        container: Constants.CONTAINER,
        guest: guest, 
        jquery_js: Paths.JQUERY_JS, 
        jquery_ui_css: Paths.JQUERY_UI_CSS, 
        jquery_ui_js: Paths.JQUERY_UI_JS, 
        username: username,
    });
}