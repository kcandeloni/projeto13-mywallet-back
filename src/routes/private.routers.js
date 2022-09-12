import express from 'express';
import  verificaToken from '../middlewares/tokenValidation.middleware.js';
import my_data from '../controllers/my_data.controllers.js';
import update_wallet from '../controllers/update_wallet.controllers.js';
import validaWallet from '../middlewares/walletValidation.middleware.js';

const authRouter = express.Router();
authRouter.get('/mywallet', verificaToken, my_data);
authRouter.post('/mywallet',
    verificaToken,
    validaWallet,
    update_wallet);
export default authRouter;
