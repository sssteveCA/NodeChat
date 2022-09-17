//Authentiction routes (login,subscribe,account verify,password recovery)

import express, { NextFunction, Request, Response } from 'express';
import mustacheExpress from 'mustache-express';
import { Subscribe, SubscribeInterface } from '../../classes/authentication/subscribe';
import { Account } from '../../classes/database/models/account';
import { Constants } from '../../namespaces/constants';
import { Paths } from '../../namespaces/paths';
import { Regexs } from '../../namespaces/regex';
import { subscribe_validator } from './authentication_m';

const app = express();
export const authentication_routes = express.Router();

authentication_routes.get('/login',(req,res)=>{
    res.render('login',{
        bootstrap_css: Paths.BOOTSTRAP_CSS,
        bootstrap_js: Paths.BOOTSTRAP_JS,
        container: Constants.CONTAINER,
        login: Paths.LOGIN,
        subscribe: Paths.SUBSCRIBE
    });
});

authentication_routes.get('/subscribe',(req,res)=>{
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

authentication_routes.get('/verify',(req,res)=>{
    res.render('verify',{
        bootstrap_css: '../'+Paths.BOOTSTRAP_CSS,
        bootstrap_js: '../'+Paths.BOOTSTRAP_JS,
        container: Constants.CONTAINER,
        jquery_js: '../'+Paths.JQUERY_JS,
        jquery_ui_css: '../'+Paths.JQUERY_UI_CSS,
        jquery_ui_js: '../'+Paths.JQUERY_UI_JS,
    });
});

authentication_routes.get('/verify/:code',async(req,res)=>{
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
    res.status(status_code).render('code_verify',{
            bootstrap_css: '../'+Paths.BOOTSTRAP_CSS,
            bootstrap_js: '../'+Paths.BOOTSTRAP_JS,
            container: Constants.CONTAINER,
            verify_response: verify_response
        });
});

authentication_routes.post('/login',(req,res)=>{

});

authentication_routes.post('/newAccount',subscribe_validator,(req,res)=> {
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
        res.status(obj['code']).send(obj);
    }).catch(err => {
        res.send(500).send(err);
    });
});