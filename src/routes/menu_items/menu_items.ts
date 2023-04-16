//Menu items routes

import express from 'express';
import { Constants } from '../../namespaces/constants';
import { Paths } from '../../namespaces/paths';
import session from 'express-session';
import CookiePolicy from '../../policies/cookiepolicy';
import PrivacyPolicy from '../../policies/privacypolicy';
import TermsAndConditions from '../../policies/termsandconditions';
import { about_us } from './functions/about_us';
import { contacts } from './functions/contacts';
import { rules } from './functions/rules';
import { cookie_policy } from './functions/cookie_policy';

export const menu_items_routes = express.Router();

menu_items_routes.use(session({
    secret: process.env.EXPRESS_SESSION_SECRET as string,
    saveUninitialized: false,
    resave: false
}));

menu_items_routes.get('/about_us', about_us);

menu_items_routes.get('/contacts', contacts);

menu_items_routes.get('/cookie_policy', cookie_policy);

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

menu_items_routes.get('/rules', rules);

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

