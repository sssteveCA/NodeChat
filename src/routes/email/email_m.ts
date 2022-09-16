
import express, { NextFunction, Request, Response } from 'express';
import { Regexs } from '../../namespaces/regex';

/**
 * Contacts form input validator middleware
 */
export const contacts_validator = (req: Request, res: Response ,next: NextFunction) => {
    let body: object = req.body as object;
    if(body != null){
        if(body.hasOwnProperty('name') && body.hasOwnProperty('email') && body.hasOwnProperty('subject') && body.hasOwnProperty('message')){
            let valid: boolean = true;
            for(const [key,value] of Object.entries(body)){
                if(value == ''){
                    valid = false;
                    break;
                }
                if(key == 'email'){
                    let regex: RegExp = new RegExp(Regexs.EMAIL);
                    if(!regex.test(value)){
                        valid = false;
                        break;
                    }
                }//if(key == 'email'){
            }//for(const [key,value] of Object.entries(body)){
            if(valid == true)
               next();
            else
                res.status(400).send({done: false, msg: "I dati inseriti non sono nel formato corretto, riprova"});
        }//if(body.hasOwnProperty('name') && body.hasOwnProperty('email') && body.hasOwnProperty('subject') && body.hasOwnProperty('message')){ 
    }//if(body != null){
    else
        res.status(400).send({done: false, msg: "Inserisci i dati richiesti per continuare"});
};