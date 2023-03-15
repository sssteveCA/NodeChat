
import express from "express";
import { loggedApi } from "../../../middlewares/middlewares_api";
import { delete_account } from "./function/delete_account";

export const profile_delete_routes = express.Router();

profile_delete_routes.post('/account',loggedApi, delete_account);