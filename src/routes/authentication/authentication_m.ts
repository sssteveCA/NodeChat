
import express, { NextFunction, Request, Response } from 'express';
import { Messages } from '../../namespaces/messages';
import { Regexs } from '../../namespaces/regex';
import url from 'url';
import { Account, AccountInterface } from '../../classes/database/models/account';
import { MongoDbModelManagerInterface } from '../../classes/database/mongodbmodelmanager';
import { Constants } from '../../namespaces/constants';
import { Schemas } from '../../namespaces/schemas';
import brcypt from 'bcrypt';

/**
 * Login form validator middleware
 */
export const login_validator = (req: Request, res: Response, next: NextFunction) => {
    let body: object = req.body;
    let passed: boolean = false;
    if(body.hasOwnProperty("username") && body.hasOwnProperty("password")){
        if(body['username'] != "" && body['password'] != ""){
            passed = true;
            next();
        }//if(body['username'] != "" && body['password']){
    }//if(body.hasOwnProperty("username") && body.hasOwnProperty("password")){
    if(!passed){
        let msg_encoded = encodeURIComponent(Messages.ERROR_MISSINGDATA);
        res.redirect("/login?message="+msg_encoded);
    } 
};

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
            done: false, msg: Messages.ERROR_MISSINGDATA
        });
};


/**
 * 
 * Check if provided username and password are correct
 */
export const verify_credentials = (req: Request, res: Response, next: NextFunction) => {
    let username: string = req.body.username;
    let password: string = req.body.password;
    let mongo_mmi: MongoDbModelManagerInterface = {
        collection_name: Constants.MONGODB_ACCOUNTS_COLLECTION,
        schema: Schemas.ACCOUNTS
    };
    let ac_data: AccountInterface = {};
    let ac: Account = new Account(mongo_mmi,ac_data);
    ac.getAccount({username: username}).then(res => {
        if(res['done'] == true && ac.password_hash != null){
            return brcypt.compare(password, ac.password_hash);
        }
    }).then(res =>{
        
    })
};