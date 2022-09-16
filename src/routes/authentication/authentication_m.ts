
import express, { NextFunction, Request, Response } from 'express';
import { Regexs } from '../../namespaces/regex';


/**
 * Subscribe form validator middleware
 */
export const subscribe_validator = (req: Request, res: Response, next: NextFunction) =>{
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