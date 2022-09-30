
import express, { NextFunction, Request, Response } from 'express';
import { Messages } from '../../../namespaces/messages';

/**
 * /**
 * Pass to the next hop if user is logged
 */
export const loggedApi = async(req: Request, res: Response, next: NextFunction) => {
    let token_key: string|null = req.body['token_key'] ? req.body['token_key'] : null;
    if(token_key){
        
    }//if(token_key){
    return res.status(401).json({
        done: false,
        msg: Messages.ERROR_NOTAUTHENTICATED
    });
};