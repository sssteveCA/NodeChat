
import express from 'express';
import { ObjectId } from 'mongoose';
import { Account } from '../../../classes/database/models/account';
import { Accounts, AccountsInterface } from '../../../classes/database/models/accounts';
import { Token } from '../../../classes/database/models/token';
import { MongoDbModelManagerInterface } from '../../../classes/database/mongodbmodelmanager';
import { MongoDbModelsManagerInterface } from '../../../classes/database/mongodbmodelsmanager';
import { Messages } from '../../../namespaces/messages';
import { Paths } from '../../../namespaces/paths';
import { loggedApi } from '../middlewares/middlewares_api';
import { privacy_router } from '../privacy/privacy';
import { current_user_api } from './functions/current_user_api';
import { user_info_api } from './functions/user_info_api';
import { profile_routes_api } from './profile/profile_api';

export const account_routes_api = express.Router();

account_routes_api.use('/profile',profile_routes_api);

account_routes_api.use('/privacy',privacy_router);

account_routes_api.get('/current_user', loggedApi, current_user_api);

account_routes_api.get('/user_info', loggedApi, user_info_api);
