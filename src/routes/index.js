import express from 'express';
import loginRouter from './login.routers.js';
import authRouter from './private.routers.js';

const router = express.Router();
router.use(loginRouter);
router.use(authRouter);
export default router;