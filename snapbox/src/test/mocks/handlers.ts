import { authHandlers } from './auth-handlers';
import { sessionHandlers } from './session-handlers';

// Both the browser and the tests import this one list.
export const handlers = [...authHandlers, ...sessionHandlers];
