import express, {Request , Response } from "express";
import Tour from "../../model/tours.model"
const router = express.Router();
import { getAllTours } from "../../controller/client/tours.controller";
router.get("/", getAllTours);

export default router;
