import { Request, Response } from "express";
import { Login, LoginInterface } from "../../../classes/authentication/login";

export function login(req: Request, res: Response){
    let username: string = req.body.username;
    let login_data: LoginInterface = {
        accountId: res.locals.accountId
    };
    let login: Login = new Login(login_data);
    login.login().then(obj => {
        if(obj['done'] == true){
            req.session['username'] = username;
            req.session['token_key'] = obj['token_key'];
            return res.redirect("/");
        }
        let msg_encoded: string = encodeURIComponent(obj['msg']);
        return res.redirect('/login?message='+msg_encoded);  
         
    });
}