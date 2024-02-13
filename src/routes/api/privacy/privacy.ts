
import express from 'express';
import preferences_set from './functions/preferences_set';

export const privacy_router = express.Router();

privacy_router.post('/preferences_set',preferences_set);
