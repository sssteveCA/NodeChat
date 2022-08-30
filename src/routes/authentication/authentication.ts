//Authentiction routes (login,subscribe,account verify,password recovery)

import express from 'express';
import mustacheExpress from 'mustache-express';
import { Constants } from '../../constants';
import { Paths } from '../../paths';

const app = express();
export const authentication_routes = express.Router();

authentication_routes.get('/login',(req,res)=>{
    res.render('login',{
        container: Constants.CONTAINER,
        login: Paths.LOGIN,
        subscribe: Paths.SUBSCRIBE
    });
});

authentication_routes.get('/subscribe',(req,res)=>{
    res.render('subscribe',{
        container: Constants.CONTAINER,
        newAccount: Paths.NEWACCOUNT
    });
});