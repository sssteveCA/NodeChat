
import { NextFunction, Request, Response } from 'express';
import { Messages } from '../../namespaces/messages';
import { Regexs } from '../../namespaces/regex';
import { Account, AccountInterface } from '../../classes/database/models/account';
import { MongoDbModelManagerInterface } from '../../classes/database/mongodbmodelmanager';
import { Constants } from '../../namespaces/constants';
import { Schemas } from '../../namespaces/schemas';
import brcypt from 'bcrypt';
import { InvalidCredentialsError } from '../../classes/errors/invalidcredentialserror';
import { AccountNotActivatedError } from '../../classes/errors/accountnotactivatederror';

/**
 * Login form validator middleware
 */
export const login_validator = (req: Request, res: Response, next: NextFunction) => {
    let body: object = req.body;
    if(body.hasOwnProperty("username") && body.hasOwnProperty("password")){
        if(body['username'] != "" && body['password'] != ""){
            return next();
        }//if(body['username'] != "" && body['password']){
    }//if(body.hasOwnProperty("username") && body.hasOwnProperty("password")){
    let msg_encoded = encodeURIComponent(Messages.ERROR_MISSINGDATA);
    return res.redirect("/login?message="+msg_encoded);   
};

/**
 * Subscribe form validator middleware
 */
export const subscribe_validator = (req: Request, res: Response, next: NextFunction) =>{
    let body: object = req.body as object;
    let propertyExists: boolean = (
        body.hasOwnProperty("name") && body.hasOwnProperty("surname") &&
        body.hasOwnProperty("username") && body.hasOwnProperty("email") && body.hasOwnProperty("password") && body.hasOwnProperty("confPass"));
    let notEmpty: boolean = (body["name"] != "" && body["surname"] != "" && body["username"] != "" && body["email"] != "" && body["password"] != "" && body["confPass"] != "");
    if(propertyExists && notEmpty){
        if(body["password"] == body["confPass"]){
            let email_regex: RegExp = new RegExp(Regexs.EMAIL);
            if(email_regex.test(body["email"])){
                let password_regex: RegExp = new RegExp(Regexs.PASSWORD);
                if(password_regex.test(body["password"])){
                    return next();
                }//if(email_regex.test(body["password"])){
                return res.status(400).send({
                    done: false, message: "La password deve contenere almeno una lettera minuscola, almeno una lettera maiuscola e un numero"
                });
            }//if(email_regex.test(body["email"])){
            return res.status(400).send({
                    done: false, message: "L'indirizzo email inserito non è valido"
                    });
        }//if(body["password"] == body["confPass"]){
        return res.status(400).send({
            done: false, message: "Le due password non coincidono"
        });
    }//if(propertyExists && notEmpty){
    return res.status(400).send({
            done: false, message: Messages.ERROR_MISSINGDATA
    });
};


/**
 * 
 * Check if provided username and password are correct
 */
export const verify_credentials = async (req: Request, res: Response, next: NextFunction) => {
    let username: string = req.body.username;
    let password: string = req.body.password;
    let mongo_mmi: MongoDbModelManagerInterface = {
        collection_name: Constants.MONGODB_ACCOUNTS_COLLECTION,
        schema: Schemas.ACCOUNTS
    };
    let ac_data: AccountInterface = {};
    let ac: Account = new Account(mongo_mmi,ac_data);
    await ac.getAccount({username: username}).then(res => {
        if(res[Constants.KEY_DONE] == true && res['result'] != null && username == res['result']['username']){
            return brcypt.compare(password, res['result']['password']);
        }
        else throw new InvalidCredentialsError(Messages.ERROR_INVALIDCREDENTIALS);
    }).then(result =>{
        if(result == true){
            if(ac.verified == true){
                res.locals.accountId = ac.id;
                return next();
            }
            else throw new AccountNotActivatedError("Il tuo account non è attivo. Per utilizzarlo completa la registrazione facendo click sul link che ti abbiamo inviato alla tua casella di posta.");
        }
        else throw new InvalidCredentialsError(Messages.ERROR_INVALIDCREDENTIALS);
    }).catch(err => {
        console.error(err); 
        if(err instanceof InvalidCredentialsError || err instanceof AccountNotActivatedError){
            let message: string = encodeURIComponent(err.message);
            return res.redirect("/login?message="+message);
        } 

        let message: string = encodeURIComponent("Errore durante il login dell'account");
        return res.redirect("/login?message="+message);
    });
};