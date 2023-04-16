//Menu items routes

import express from 'express';
import { Constants } from '../../namespaces/constants';
import { Paths } from '../../namespaces/paths';
import session from 'express-session';
import CookiePolicy from '../../policies/cookiepolicy';
import PrivacyPolicy from '../../policies/privacypolicy';
import TermsAndConditions from '../../policies/termsandconditions';
import { about_us } from './functions/about_us';

export const menu_items_routes = express.Router();

menu_items_routes.use(session({
    secret: process.env.EXPRESS_SESSION_SECRET as string,
    saveUninitialized: false,
    resave: false
}));

menu_items_routes.get('/about_us', about_us);

menu_items_routes.get('/contacts',(req,res)=>{
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
});

menu_items_routes.get('/cookie_policy',(req,res)=>{
    let username: string = req.session['username'] ? req.session['username'] : null;
    let guest: boolean = !username ? true : false;
    let cookie_policy: string = CookiePolicy.getDocument();
    return res.render('policy_document',{
        bootstrap_css: Paths.BOOTSTRAP_CSS,
        bootstrap_js: Paths.BOOTSTRAP_JS,
        container: Constants.CONTAINER,
        document: cookie_policy,
        guest: guest,
        jquery_js: Paths.JQUERY_JS,
        jquery_ui_css: Paths.JQUERY_UI_CSS,
        jquery_ui_js: Paths.JQUERY_UI_JS,
        title: 'Cookie Policy',
        username: username
    });
});

menu_items_routes.get('/privacy_policy',(req,res)=>{
    let username: string = req.session['username'] ? req.session['username'] : null;
    let guest: boolean = !username ? true : false;
    let privacy_policy: string = PrivacyPolicy.getDocument();
    return res.render('policy_document',{
        bootstrap_css: Paths.BOOTSTRAP_CSS,
        bootstrap_js: Paths.BOOTSTRAP_JS,
        container: Constants.CONTAINER,
        document: privacy_policy,
        guest: guest,
        jquery_js: Paths.JQUERY_JS,
        jquery_ui_css: Paths.JQUERY_UI_CSS,
        jquery_ui_js: Paths.JQUERY_UI_JS,
        title: 'Privacy Policy',
        username: username
    });
});

menu_items_routes.get('/rules',(req,res)=>{
    let username: string = req.session['username'] ? req.session['username'] : null;
    let guest: boolean = !username ? true : false;
    return res.render('rules',{
        bootstrap_css: Paths.BOOTSTRAP_CSS, 
        bootstrap_js: Paths.BOOTSTRAP_JS, 
        container: Constants.CONTAINER, 
        guest: guest, 
        jquery_js: Paths.JQUERY_JS, 
        jquery_ui_css: Paths.JQUERY_UI_CSS, 
        jquery_ui_js: Paths.JQUERY_UI_JS, 
        username: username 
    });
});

menu_items_routes.get('/terms',(req,res)=>{
    let username: string = req.session['username'] ? req.session['username'] : null;
    let guest: boolean = !username ? true : false;
    let terms_and_conditions: string = TermsAndConditions.getDocument();
    return res.render('policy_document',{
        bootstrap_css: Paths.BOOTSTRAP_CSS, 
        bootstrap_js: Paths.BOOTSTRAP_JS, 
        container: Constants.CONTAINER, 
        document: terms_and_conditions,
        guest: guest, 
        jquery_js: Paths.JQUERY_JS, 
        jquery_ui_css: Paths.JQUERY_UI_CSS, 
        jquery_ui_js: Paths.JQUERY_UI_JS,
        title: 'Termini e condizioni', 
        username: username 
    });
});

