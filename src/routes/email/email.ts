
//Email routes
import bodyParser from 'body-parser';
import express, { NextFunction, Request, Response } from 'express';
import { EmailInterface, Email } from '../../classes/email/email';

export const email_routes = express.Router();

//Middleware for validate email contact values
const contact_validator = (req: Request, res: Response ,next: NextFunction) => {
    let body: object = req.body as object;
    console.log("body");
    console.log(body);
    if(body != null){
        if(body.hasOwnProperty('name') && body.hasOwnProperty('email') && body.hasOwnProperty('subject') && body.hasOwnProperty('message')){
            let valid: boolean = true;
            for(const [key,value] of Object.entries(body)){
                if(value == ''){
                    valid = false;
                    break;
                }
                if(key == 'email'){
                    let regex: RegExp = new RegExp('^[a-zA-Z]{4,30}@([a-zA-Z0-9]{3,30}\.){1,5}[a-z]{2,10}$');
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
    res.status(400).send({done: false, msg: "Inserisci i dati richiesti per continuare"});
};

email_routes.post('/send_email',contact_validator,async (req,res)=>{
    let em_data: EmailInterface = {
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject,
        message: req.body.message
    };
    console.log("em_data");
    console.log(em_data);
    let em: Email = new Email(em_data);
    await em.sendMail().then(obj => {
        if(obj['done'] == true)
            res.status(200).end(obj);
        else
            res.status(500).end(obj);
    });
});

