import express from "express";
import { loggedApi } from "../../../middlewares/middlewares_api";
import get_photos from "./function/get_photos";
import get_videos from "./function/get_videos";

export const profile_get_routes = express.Router();

profile_get_routes.get('/photos',loggedApi, get_photos);

profile_get_routes.get('/videos',loggedApi,get_videos);