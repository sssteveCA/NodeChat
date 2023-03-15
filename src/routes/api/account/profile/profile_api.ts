
import express from "express";
import { loggedApi } from "../../middlewares/middlewares_api";
import { add_photo } from "./add/function/add_photo";
import { delete_account } from "./delete/function/delete_account";
import get_photos from "./get/function/get_photos";
import { search_api } from "./functions/search_api";
import update_contacts_information from "./update/function/update_contacts_information";
import update_education from "./update/function/update_education";
import update_employment from "./update/function/update_employment";
import update_personal_information from "./update/function/update_personal_information";
import { upload_cover_image } from "./add/function/upload_cover_image";
import { upload_profile_image } from "./add/function/upload_profile_image";
import { profile_add_routes } from "./add/profile_add";
import { profile_delete_routes } from "./delete/profile_delete";
import { profile_get_routes } from "./get/profile_get";

export const profile_routes_api = express.Router();

profile_routes_api.use('/add',profile_add_routes);

profile_routes_api.use('/delete',profile_delete_routes);

profile_routes_api.use('/get',profile_get_routes);

profile_routes_api.post('/search', loggedApi, search_api);

profile_routes_api.post('/upload_cover_image',upload_cover_image);

profile_routes_api.post('/update_contacts_information', loggedApi, update_contacts_information);

profile_routes_api.post('/update_education',loggedApi,update_education);

profile_routes_api.post('/update_employment',loggedApi,update_employment);

profile_routes_api.post('/update_personal_information', loggedApi, update_personal_information);

profile_routes_api.post('/upload_profile_image',upload_profile_image);