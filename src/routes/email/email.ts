
//Email routes
import bodyParser from 'body-parser';
import express, { NextFunction, Request, Response } from 'express';
import { EmailInterface, Email } from '../../classes/email/email';
import { Regexs } from '../../namespaces/regex';
import { contacts_validator } from './email_m';
import { send_email } from './functions/send_email';

export const email_routes = express.Router();

email_routes.post('/send_email',contacts_validator,send_email);

