
import express from "express";
import { loggedApi } from "../../middlewares/middlewares_api";
import { search_api } from "./functions/search_api";
import { profile_add_routes } from "./add/profile_add";
import { profile_delete_routes } from "./delete/profile_delete";
import { profile_get_routes } from "./get/profile_get";
import { profile_update_routes } from "./update/profile_update";

export const profile_routes_api = express.Router();

profile_routes_api.use('/add',profile_add_routes);

profile_routes_api.use('/delete',profile_delete_routes);

profile_routes_api.use('/get',profile_get_routes);

profile_routes_api.use('/update',profile_update_routes);

profile_routes_api.post('/search', loggedApi, search_api);
