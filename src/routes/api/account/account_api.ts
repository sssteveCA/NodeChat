
import express from 'express';
import { ObjectId } from 'mongoose';
import { Account } from '../../../classes/database/models/account';
import { Accounts, AccountsInterface } from '../../../classes/database/models/accounts';
import { Token } from '../../../classes/database/models/token';
import { MongoDbModelManagerInterface } from '../../../classes/database/mongodbmodelmanager';
import { MongoDbModelsManagerInterface } from '../../../classes/database/mongodbmodelsmanager';
import { Messages } from '../../../namespaces/messages';
import { Paths } from '../../../namespaces/paths';
import { Schemas } from '../../../namespaces/schemas';
import { loggedApi } from '../middlewares/middlewares_api';
import { current_user_api } from './functions/current_user_api';
import { search_api } from './functions/search_api';
import { user_info_api } from './functions/user_info_api';
import multipart from "multiparty";
import { upload_profile_image } from './functions/upload_profile_image';
import { upload_cover_image } from './functions/upload_cover_image';
import { update_personal_information } from './functions/update_personal_information';

export const account_routes_api = express.Router();

account_routes_api.post('/current_user', loggedApi, current_user_api);

account_routes_api.post('/user_info', loggedApi, user_info_api);

account_routes_api.post('/profile/search', loggedApi, search_api);

account_routes_api.post('/profile/upload_cover_image',upload_cover_image);

account_routes_api.post('/profile/update_personal_information',update_personal_information);

account_routes_api.post('/profile/upload_profile_image',upload_profile_image);
