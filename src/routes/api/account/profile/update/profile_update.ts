import express from "express";
import { loggedApi } from "../../../middlewares/middlewares_api";
import update_contacts_information from "./function/update_contacts_information";
import update_education from "./function/update_education";
import update_employment from "./function/update_employment";
import update_personal_information from "./function/update_personal_information";

export const profile_update_routes = express.Router();

profile_update_routes.put('/contacts_information',loggedApi, update_contacts_information);

profile_update_routes.put('/education',loggedApi,update_education);

profile_update_routes.put('/employment',loggedApi,update_employment);

profile_update_routes.put('/personal_information',loggedApi,update_personal_information);