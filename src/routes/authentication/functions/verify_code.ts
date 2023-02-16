import { Request, Response } from "express";
import { Subscribe, SubscribeInterface } from "../../../classes/authentication/subscribe";
import { Constants } from "../../../namespaces/constants";
import { Paths } from "../../../namespaces/paths";

export async function verify_code(req:Request, res: Response){
    let code = req.params.code;
    let status_code: number = 200;
    let verify_response: string = "";
    let sb_data: SubscribeInterface = {
        activation_code: code
    };
    let sb: Subscribe = new Subscribe(sb_data);
    await sb.activateAccount().then(obj => {
        verify_response = obj[Constants.KEY_MESSAGE];
        status_code = obj[Constants.KEY_CODE]; 
    });
    return res.status(status_code).render('code_verify',{
        bootstrap_css: '../'+Paths.BOOTSTRAP_CSS, bootstrap_js: '../'+Paths.BOOTSTRAP_JS,
        container: Constants.CONTAINER, jquery_js: '../'+Paths.JQUERY_JS,verify_response: verify_response
    });
}