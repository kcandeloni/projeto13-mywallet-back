import express from 'express';
import loginRouter from './login.routers.js';
import my_data from './my_data.routers.js';

const router = express.Router();
router.use(loginRouter);
router.use(my_data);
export default router;