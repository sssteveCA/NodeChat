
import express from "express";
import { loggedApi } from "../../middlewares/middlewares_api";
import { add_photo } from "./functions/add_photo";
import { delete_account } from "./functions/delete_account";
import { search_api } from "./functions/search_api";
import update_contacts_information from "./functions/update_contacts_information";
import update_education from "./functions/update_education";
import update_employment from "./functions/update_employment";
import update_personal_information from "./functions/update_personal_information";
import { upload_cover_image } from "./functions/upload_cover_image";
import { upload_profile_image } from "./functions/upload_profile_image";

export const profile_routes_api = express.Router();

profile_routes_api.post('/add_photo', add_photo);

profile_routes_api.post('/delete_account',loggedApi, delete_account);

profile_routes_api.post('/search', loggedApi, search_api);

profile_routes_api.post('/upload_cover_image',upload_cover_image);

profile_routes_api.post('/update_contacts_information', loggedApi, update_contacts_information);

profile_routes_api.post('/update_education',loggedApi,update_education);

profile_routes_api.post('/update_employment',loggedApi,update_employment);

profile_routes_api.post('/update_personal_information', loggedApi, update_personal_information);

profile_routes_api.post('/upload_profile_image',upload_profile_image);