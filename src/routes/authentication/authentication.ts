//Authentiction routes (login,subscribe,account verify,password recovery)

import express from 'express';
import mustacheExpress from 'mustache-express';
import { Paths } from '../../paths';

const app = express();
export const authentication_routes = express.Router();

authentication_routes.get('/login',(req,res)=>{
    res.render('login',{
        jquery_ui_css: Paths.JQUERY_UI_CSS,
        login: Paths.LOGIN,
        subscribe: Paths.SUBSCRIBE
    });
});

authentication_routes.get('/subscribe',(req,res)=>{
    res.render('subscribe',{
        jquery_ui_css: Paths.JQUERY_UI_CSS,
        newAccount: Paths.NEWACCOUNT
    });
});