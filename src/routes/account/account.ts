//Account operations routes

import express from 'express';

import { logged } from '../middlewares/middlewares';
import userprofile_page from './functions/userprofile_page';

export const account_routes = express.Router();

account_routes.get("/profile/:username", logged, userprofile_page);