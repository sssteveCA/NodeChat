//Authentiction routes (login,subscribe,account verify,password recovery)

import express, { NextFunction, Request, Response } from 'express';
import mustacheExpress from 'mustache-express';
import { Login, LoginInterface } from '../../classes/authentication/login';
import { Subscribe, SubscribeInterface } from '../../classes/authentication/subscribe';
import { Account } from '../../classes/database/models/account';
import { Constants } from '../../namespaces/constants';
import { Paths } from '../../namespaces/paths';
import { Regexs } from '../../namespaces/regex';
import { guest } from '../middlewares/middlewares';
import { login_validator, subscribe_validator, verify_credentials } from './authentication_m';
import session from 'express-session';
import { verify_code } from './functions/verify_code';
import { login_get, login_post } from './functions/login';
import { new_account } from './functions/new_account';

export const authentication_routes = express.Router();

authentication_routes.use(session({
    secret: process.env.EXPRESS_SESSION_SECRET as string,
    saveUninitialized: false,
    resave: false
}));

authentication_routes.get('/login', guest, (req,res)=>{
    let message: string|null = (req.query.message != null) ? req.query.message as string : null;
    res.render('login',{
        bootstrap_css: Paths.BOOTSTRAP_CSS,
        bootstrap_js: Paths.BOOTSTRAP_JS,
        container: Constants.CONTAINER,
        jquery_js: Paths.JQUERY_JS,
        login: Paths.LOGIN,
        message: message,
        subscribe: Paths.SUBSCRIBE
    });
});

authentication_routes.get('/logout', async (req,res)=>{
    if(req.session['username'])req.session['username'] = null;
    if(req.session['token_key'])req.session['token_key'] = null;
    req.session.destroy(()=>{
        return res.redirect("/");
    }); 
});

authentication_routes.get('/subscribe', guest, (req,res)=>{
    res.render('subscribe',{
        bootstrap_css: Paths.BOOTSTRAP_CSS,
        bootstrap_js: Paths.BOOTSTRAP_JS,
        jquery_js: Paths.JQUERY_JS,
        jquery_ui_css: Paths.JQUERY_UI_CSS,
        jquery_ui_js: Paths.JQUERY_UI_JS,
        container: Constants.CONTAINER,
        newAccount: Paths.NEWACCOUNT
    });
});

authentication_routes.get('/verify', guest, (req,res)=>{
    res.render('verify',{
        bootstrap_css: '../'+Paths.BOOTSTRAP_CSS,
        bootstrap_js: '../'+Paths.BOOTSTRAP_JS,
        container: Constants.CONTAINER,
        jquery_js: '../'+Paths.JQUERY_JS,
        jquery_ui_css: '../'+Paths.JQUERY_UI_CSS,
        jquery_ui_js: '../'+Paths.JQUERY_UI_JS,
    });
});

authentication_routes.get('/verify/:code', guest, verify_code);

authentication_routes.post('/login', [login_validator, verify_credentials], login_post);

authentication_routes.post('/newAccount',[guest,subscribe_validator],new_account);