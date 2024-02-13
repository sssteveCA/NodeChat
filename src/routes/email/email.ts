
//Email routes
import express from 'express';
import { contacts_validator } from './email_m';
import { send_email } from './functions/send_email';

export const email_routes = express.Router();

email_routes.post('/send_email',contacts_validator,send_email);

