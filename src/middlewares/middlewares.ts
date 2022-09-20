//Middlewares used in different routes
import express, { NextFunction, Request, Response } from 'express';
import session from 'express-session';

/**
 * Pass to the next hop if user is not logged 
 */
 export const guest = (req: Request, res: Response, next: NextFunction) => {
    if(req.session['username'] && req.session['token_key'])
        return res.redirect("/");
    else
        return next();
};