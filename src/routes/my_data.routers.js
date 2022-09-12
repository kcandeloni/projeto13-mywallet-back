import express from 'express';
import  verificaToken from '../middlewares/tokenValidation.middleware.js';
import my_data from '../controllers/my_data.controllers.js';

const authRouter = express.Router();
authRouter.get('/my-data', verificaToken, my_data);
authRouter.post('/new-receive', verificaToken, my_data);
authRouter.post('/new-pay', verificaToken, my_data);
export default authRouter;