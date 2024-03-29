import { Request, Response } from "express";
import { DeleteAccount, DeleteAccountInterface } from "../../../../../../classes/account/delete/deleteaccount";
import { Constants } from "../../../../../../namespaces/constants";
import { Messages } from "../../../../../../namespaces/messages";

export async function delete_account(req:Request, res: Response){
    if(req.body['password'] && req.body['conf_password']){
        if(req.body['password'] == req.body['conf_password']){
            let daData: DeleteAccountInterface = {
                token_key: res.locals.tokenKey, password: req.body['password']
            }
            let da: DeleteAccount = new DeleteAccount(daData);
            const da_response: object = await da.deleteAccount();
            if(da_response[Constants.KEY_DONE])
                await new Promise<any>((resolve) =>{
                    req.session.destroy(()=>{ resolve({}) });
                });
            return res.status(da_response[Constants.KEY_CODE]).json({
                done: da_response[Constants.KEY_DONE], message: da_response[Constants.KEY_MESSAGE]});
        }//if(req.body['password'] == req.body['conf_password']){
        else{
            return res.status(400).json({done: false, message: Messages.ERROR_PASSWORD_MISMATCH})
        }
    }//if(req.body['password'] && req.body['conf_password']){
    else{
        return res.status(400).json({done: false, message: Messages.ERROR_MISSINGDATA})
    }
}