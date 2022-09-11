import express from 'express';
import  verificaToken from '../middlewares/tokenValidationMiddleware.js';
import { meus_dados } from '../controllers/meus_dados.js';

const authRouter = express.Router();
authRouter.use(verificaToken);
authRouter.get("/meus-dados", meus_dados);
export default authRouter;