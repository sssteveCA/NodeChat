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

authentication_routes.get('/verify/:code',(req,res)=>{
    let code = req.params.code;
    if(code != null)
        console.log("Activation code => "+code);
    else
        console.log("Activation code = null");
    res.render('verify',{
        bootstrap_css: Paths.BOOTSTRAP_CSS,
        bootstrap_js: Paths.BOOTSTRAP_JS,
        jquery_js: Paths.JQUERY_JS,
        jquery_ui_css: Paths.JQUERY_UI_CSS,
        jquery_ui_js: Paths.JQUERY_UI_JS,
    });

});

authentication_routes.post('/newAccount',subscribe_validator,(req,res)=> {
    console.log("authentication route newAccount");
    let body: object = req.body as object;
    let subscribe_data: SubscribeInterface = {
        username: body['username'],
        email: body['email'],
        password: body['password']
    };
    let subscribe: Subscribe = new Subscribe(subscribe_data);
    subscribe.insertNewAccount().then(obj => {
        res.status(obj['code']).send(obj);
    }).catch(err => {
        res.send(500).send(err);
    });
});