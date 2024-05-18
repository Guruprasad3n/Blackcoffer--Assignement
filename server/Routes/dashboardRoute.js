import express from "express";
import { getData, createData } from "../Controllers/dashboardController.js";

const router = express.Router();

router.post("/create", createData);
router.get("/", getData);

export default router;
