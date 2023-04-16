import { Request, Response } from "express";
import path from 'path'
import fs from 'fs/promises'
import mustache from 'mustache'
import CookiePolicy from "../../../policies/cookiepolicy";
import { Paths } from "../../../namespaces/paths";

export async function cookie_policy(req: Request, res: Response){
    let username: string = req.session['username'] ? req.session['username'] : null;
    let guest: boolean = !username ? true : false;
    let cookie_policy: string = CookiePolicy.getDocument();
    return res.render('policy_document',{
        bootstrap_css: Paths.BOOTSTRAP_CSS,
        bootstrap_js: Paths.BOOTSTRAP_JS,
        document: cookie_policy,
        guest: guest,
        jquery_js: Paths.JQUERY_JS,
        jquery_ui_css: Paths.JQUERY_UI_CSS,
        jquery_ui_js: Paths.JQUERY_UI_JS,
        title: 'Cookie Policy',
        username: username
    });
}