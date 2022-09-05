
//Email routes
import bodyParser from 'body-parser';
import express, { NextFunction, Request, Response } from 'express';

const email_routes = express.Router();

email_routes.post('/send_email',(req,res)=>{
    
});

//Validate email contact values
const contact_validator = (req: Request, res: Response ,next: NextFunction) => {
    console.log(req.body);
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