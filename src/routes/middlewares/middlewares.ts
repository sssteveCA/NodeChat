//Middlewares used in different routes
import { NextFunction, Request, Response } from 'express';
import { loggedMiddleware } from './functions/logged';
import { Constants } from '../../namespaces/constants';

/**
 * Pass to the next hop if user is not logged 
 */
 export const guest = (req: Request, res: Response, next: NextFunction) => {
    if(req.session[Constants.KEY_USERNAME] && req.session[Constants.KEY_TOKEN])
        return res.redirect("/");
    else return next();
};

/**
 * Pass to the next hop if user is logged
 */
export const logged = loggedMiddleware;