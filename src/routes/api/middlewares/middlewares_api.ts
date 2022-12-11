
import express, { NextFunction, Request, Response } from 'express';
import { Token, TokenInterface } from '../../../classes/database/models/token';
import { MongoDbModelManagerInterface } from '../../../classes/database/mongodbmodelmanager';
import { NotAuthenticatedError } from '../../../classes/errors/notauthenticatederror';
import { Messages } from '../../../namespaces/messages';
import { Schemas } from '../../../namespaces/schemas';
import multiparty from "multiparty";
import { loggedApiMiddleware } from './functions/logged_api';

/**
 * /**
 * Pass to the next hop if user is logged
 */
export const loggedApi = loggedApiMiddleware;