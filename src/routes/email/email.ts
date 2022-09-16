
//Email routes
import bodyParser from 'body-parser';
import express, { NextFunction, Request, Response } from 'express';
import { EmailInterface, Email } from '../../classes/email/email';
import { Regexs } from '../../namespaces/regex';
import { contacts_validator } from './email_m';

export const email_routes = express.Router();

email_routes.post('/send_email',contacts_validator,async (req,res)=>{
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

