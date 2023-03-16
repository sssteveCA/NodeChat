import express from "express";
import { loggedApi } from "../../../middlewares/middlewares_api";
import get_photos from "./function/get_photos";

export const profile_get_routes = express.Router();

profile_get_routes.get('/photos',loggedApi, get_photos);