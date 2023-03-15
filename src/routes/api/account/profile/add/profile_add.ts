import express from "express";
import { add_photo } from "./function/add_photo";
import { upload_cover_image } from "./function/upload_cover_image";
import { upload_profile_image } from "./function/upload_profile_image";

export const profile_add_routes = express.Router();

profile_add_routes.post('/photo',add_photo);

profile_add_routes.post('/cover_image',upload_cover_image);

profile_add_routes.post('/profile_image',upload_profile_image);