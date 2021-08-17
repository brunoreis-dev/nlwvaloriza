import { Router } from 'express';
import { AuthenticateUserController } from './controllers/AuthenticateUserController';
import { ensureAdmin } from './middlewares/ensureAdmin';
import { ensureAuthenticated } from './middlewares/ensureAuthenticated';

import { CreateComplimentController } from './controllers/CreateComplimentController';
import { CreateTagController } from './controllers/CreateTagController';
import { CreateUserController } from './controllers/CreateUserController';
import { ListUserSendComplimentsController } from './controllers/ListUserSendComplimentsController';
import { ListUserReceiverComplimentsController } from './controllers/ListUserReceiverComplimentsController';
import { ListTagsController } from './controllers/ListTagsController';
import { ListUsersController } from './controllers/ListUsersController';

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const createComplimentController = new CreateComplimentController();
const authenticateUserController = new AuthenticateUserController();
const listUserSendCompliments = new ListUserSendComplimentsController();
const listUserReceiverCompliments = new ListUserReceiverComplimentsController();
const listTagsController = new ListTagsController();
const listUsersController = new ListUsersController();

router.post('/users', createUserController.handle);
router.post(
  '/tags',
  ensureAuthenticated,
  ensureAdmin,
  createTagController.handle
);
router.post('/login', authenticateUserController.handle);
router.post(
  '/compliments',
  ensureAuthenticated,
  createComplimentController.handle
);

router.get(
  '/users/compliments/send',
  ensureAuthenticated,
  listUserSendCompliments.handle
);
router.get(
  '/users/compliments/receive',
  ensureAuthenticated,
  listUserReceiverCompliments.handle
);
router.get('/tags', ensureAuthenticated, listTagsController.handle);
router.get('/users', ensureAuthenticated, listUsersController.handle);

export { router };
