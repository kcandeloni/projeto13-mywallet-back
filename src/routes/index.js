import express from "express";
import meus_dados from "./meus_dados.js";

const router = express.Router();
router.use(meus_dados);
export default router;