//Menu items routes

import express from 'express';
import { Constants } from '../../namespaces/constants';
import { Paths } from '../../namespaces/paths';
import session from 'express-session';

export const menu_items_routes = express.Router();

menu_items_routes.use(session({
    secret: process.env.EXPRESS_SESSION_SECRET as string,
    saveUninitialized: false,
    resave: false
}));

menu_items_routes.get('/about_us',(req,res)=>{
    let username: string = req.session['username'] ? req.session['username'] : null;
    let guest: boolean = !username ? true : false;
    res.render('about_us',{bootstrap_css: Paths.BOOTSTRAP_CSS, bootstrap_js: Paths.BOOTSTRAP_JS, container: Constants.CONTAINER, guest: guest, jquery_js: Paths.JQUERY_JS, jquery_ui_css: Paths.JQUERY_UI_CSS, 
        jquery_ui_js: Paths.JQUERY_UI_JS, username: username });
});

menu_items_routes.get('/contacts',(req,res)=>{
    let username: string = req.session['username'] ? req.session['username'] : null;
    let guest: boolean = !username ? true : false;
    res.render('contacts',{
        bootstrap_css: Paths.BOOTSTRAP_CSS, bootstrap_js: Paths.BOOTSTRAP_JS, container: Constants.CONTAINER,
        guest: guest, jquery_js: Paths.JQUERY_JS, jquery_ui_css: Paths.JQUERY_UI_CSS, 
        jquery_ui_js: Paths.JQUERY_UI_JS, username: username,
    });
});

menu_items_routes.get('/rules',(req,res)=>{
    let username: string = req.session['username'] ? req.session['username'] : null;
    let guest: boolean = !username ? true : false;
    res.render('rules',{bootstrap_css: Paths.BOOTSTRAP_CSS, bootstrap_js: Paths.BOOTSTRAP_JS, container: Constants.CONTAINER, guest: guest, jquery_js: Paths.JQUERY_JS, jquery_ui_css: Paths.JQUERY_UI_CSS, 
        jquery_ui_js: Paths.JQUERY_UI_JS, username: username });
});

menu_items_routes.get('/terms',(req,res)=>{
    let username: string = req.session['username'] ? req.session['username'] : null;
    let guest: boolean = !username ? true : false;
    res.render('terms',{bootstrap_css: Paths.BOOTSTRAP_CSS, bootstrap_js: Paths.BOOTSTRAP_JS, container: Constants.CONTAINER, guest: guest, jquery_js: Paths.JQUERY_JS, jquery_ui_css: Paths.JQUERY_UI_CSS, 
        jquery_ui_js: Paths.JQUERY_UI_JS, username: username });
});

