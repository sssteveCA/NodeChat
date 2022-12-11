
import express, { NextFunction, Request, Response } from 'express';
import { Messages } from '../../namespaces/messages';
import { Regexs } from '../../namespaces/regex';
import { contactsValidatorMiddleware } from './middleware_functions/contacts_validator';

/**
 * Contacts form input validator middleware
 */
export const contacts_validator = contactsValidatorMiddleware;