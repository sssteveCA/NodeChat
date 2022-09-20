//Authentiction routes (login,subscribe,account verify,password recovery)

import express, { NextFunction, Request, Response } from 'express';
import mustacheExpress from 'mustache-express';
import { Login, LoginInterface } from '../../classes/authentication/login';
import { Subscribe, SubscribeInterface } from '../../classes/authentication/subscribe';
import { Account } from '../../classes/database/models/account';
import { Constants } from '../../namespaces/constants';
import { Paths } from '../../namespaces/paths';
import { Regexs } from '../../namespaces/regex';
import { guest, login_validator, subscribe_validator, verify_credentials } from './authentication_m';
import session from 'express-session';

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

authentication_routes.get('/verify/:code', guest, async(req,res)=>{
    let code = req.params.code;
    let status_code: number = 200;
    let verify_response: string = "";
    let sb_data: SubscribeInterface = {
        activation_code: code
    };
    let sb: Subscribe = new Subscribe(sb_data);
    await sb.activateAccount().then(obj => {
        verify_response = obj['msg'];
        status_code = obj['code']; 
    });
    return res.status(status_code).render('code_verify',{
        bootstrap_css: '../'+Paths.BOOTSTRAP_CSS, bootstrap_js: '../'+Paths.BOOTSTRAP_JS,
        container: Constants.CONTAINER, verify_response: verify_response
    });
});

authentication_routes.post('/login', [login_validator, verify_credentials], (req,res)=>{
    let username: string = req.body.username;
    let login_data: LoginInterface = {
        accountId: res.locals.accountId
    };
    let login: Login = new Login(login_data);
    login.login().then(obj => {
        if(obj['done'] == true){
            req.session.username = username;
            req.session.token_key = obj['token_key'];
            return res.redirect("/");
        }
        let msg_encoded: string = encodeURIComponent(obj['msg']);
        return res.redirect('/login?message='+msg_encoded);  
         
    });
});

authentication_routes.post('/newAccount',[guest,subscribe_validator],(req,res)=> {
    let body: object = req.body as object;
    let home_url: string = process.env.MAIN_URL+Paths.VERIFY as string;
    //console.log("home_url => "+home_url);
    let subscribe_data: SubscribeInterface = {
        username: body['username'],
        email: body['email'],
        password: body['password'],
        home_url: home_url
    };
    let subscribe: Subscribe = new Subscribe(subscribe_data);
    subscribe.insertNewAccount().then(obj => {
        return res.status(obj['code']).json(obj);
    }).catch(err => {
        return res.status(500).send(err);
    });
});