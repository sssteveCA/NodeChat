
import { loggedApiMiddleware } from './functions/logged_api';

/**
 * /**
 * Pass to the next hop if user is logged
 */
export const loggedApi = loggedApiMiddleware;