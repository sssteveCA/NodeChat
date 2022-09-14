
//Email routes
import bodyParser from 'body-parser';
import express, { NextFunction, Request, Response } from 'express';
import { EmailInterface, Email } from '../../classes/email/email';
import { Regexs } from '../../namespaces/regex';

export const email_routes = express.Router();

//Middleware for validate email contact values
const contact_validator = (req: Request, res: Response ,next: NextFunction) => {
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

email_routes.post('/send_email',contact_validator,async (req,res)=>{
    let em_data: EmailInterface = {
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject,
        message: req.body.message
    };
    let em: Email = new Email(em_data);
    em.sendMail().then(obj => {
        if(obj['done'] == true)
            res.status(200).send(obj);
        else
            res.status(500).send(obj);
    });
});

