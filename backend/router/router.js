import express from "express";
import { Homepage,getData } from "../controller/controller.js";

const router = express.Router();

router.get("/",Homepage);
router.get("/api/data",getData);

export default router;