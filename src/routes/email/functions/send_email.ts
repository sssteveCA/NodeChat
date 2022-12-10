import { Request, Response } from "express";
import { Email, EmailInterface } from "../../../classes/email/email";

export function send_email(req: Request, res: Response){
    let output: object = {};
    let em_data: EmailInterface = {
        name: req.body.name, email: req.body.email, subject: req.body.subject, message: req.body.message
    };
    let em: Email = new Email(em_data);
    em.sendMail().then(obj => {
        if(obj['done'] == true){
            output = {
                done: true, msg: "La tua richiesta è stata inviata. Riceverai una risposta nel minor tempo possibile"
            };
            return res.status(200).send(output);
        }
        output = {
            done: false, msg: em.error
        };
        return res.status(500).send(output);
    });
}