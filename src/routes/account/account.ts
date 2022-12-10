//Account operations routes

import express from 'express';
import { MongoDbModelManagerInterface } from '../../classes/database/mongodbmodelmanager';
import { logged } from '../middlewares/middlewares';
import { Constants } from '../../namespaces/constants';
import { Paths } from '../../namespaces/paths';
import { Schemas} from '../../namespaces/schemas';
import {Account, AccountInterface} from '../../classes/database/models/account';
import { userprofile_page } from './functions/userprofile_page';

export const account_routes = express.Router();

account_routes.get("/profile/:username", logged, userprofile_page);