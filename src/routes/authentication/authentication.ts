//Authentiction routes (login,subscribe,account verify,password recovery)

import express, { NextFunction, Request, Response } from 'express';
import mustacheExpress from 'mustache-express';
import { Constants } from '../../namespaces/constants';
import { Paths } from '../../namespaces/paths';
import { Regexs } from '../../namespaces/regex';

const app = express();
export const authentication_routes = express.Router();

const subscribe_validator = (req: Request, res: Response, next: NextFunction) =>{
    let body: object = req.body as object;
    if(body.hasOwnProperty("username") && body.hasOwnProperty("email") && body.hasOwnProperty("password") && body.hasOwnProperty("confPass")){
        if(body["password"] == body["confPass"]){
            let email_regex: RegExp = new RegExp(Regexs.EMAIL);
            if(email_regex.test(body["email"])){
                let password_regex: RegExp = new RegExp(Regexs.PASSWORD);
                if(password_regex.test(body["password"])){
                    next();
                }//if(email_regex.test(body["password"])){
                else
                   res.status(400).send({
                    done: false, msg: "La password deve contenere almeno una lettera minuscola, almeno una lettera maiuscola e un numero"
                   });
            }//if(email_regex.test(body["email"])){
            else
                res.status(400).send({
                    done: false, msg: "L'indirizzo email inserito non è valido"
                });
        }//if(body["password"] == body["confPass"]){
        else
            res.status(400).send({
                done: false, msg: "Le due password non coincidono"
            });
    }//if(body.hasOwnProperty("username") && body.hasOwnProperty("email") && body.hasOwnProperty("password") && body.hasOwnProperty("confPass")){
    else
        res.status(400).send({
            done: false, msg: "Inserisci i dati richiesti per continuare"
        });
};

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

authentication_routes.post('/newAccount',subscribe_validator,(req,res)=> {

});