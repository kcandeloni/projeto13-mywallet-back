import express from 'express';
import login from '../controllers/sign_in.controllers.js';
import createUser from '../controllers/sign_up.controllers.js';
import validaSign_in from '../middlewares/sign_inValidation.middleware.js';
import validaSign_up from '../middlewares/sign_upValidation.middleware.js';
import unique_email from '../middlewares/unique_emailValidation.middleware.js';

const loginRouter = express.Router();
loginRouter.post('/sign-up', validaSign_up, unique_email, createUser);
loginRouter.post('/sign-in', validaSign_in, login);

export default loginRouter;