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
import { login } from './functions/login';

export const authentication_routes = express.Router();

authentication_routes.use(session({
    secret: process.env.EXPRESS_SESSION_SECRET as string,
    saveUninitialized: false,
    resave: false
}));

authentication_routes.get('/login', guest, login);

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
        name: body['name'], surname: body['surname'], username: body['username'],
        email: body['email'], password: body['password'], home_url: home_url
    };
    let subscribe: Subscribe = new Subscribe(subscribe_data);
    subscribe.insertNewAccount().then(obj => {
        return res.status(obj['code']).json(obj);
    }).catch(err => {
        return res.status(500).send(err);
    });
});