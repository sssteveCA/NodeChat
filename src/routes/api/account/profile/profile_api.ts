
import express from "express";
import { loggedApi } from "../../middlewares/middlewares_api";
import { search_api } from "./functions/search_api";
import update_personal_information from "./functions/update_personal_information";
import { upload_cover_image } from "./functions/upload_cover_image";
import { upload_profile_image } from "./functions/upload_profile_image";

export const profile_routes_api = express.Router();

profile_routes_api.post('/search', loggedApi, search_api);

profile_routes_api.post('/upload_cover_image',upload_cover_image);

profile_routes_api.post('/update_personal_information', loggedApi, update_personal_information);

profile_routes_api.post('/upload_profile_image',upload_profile_image);