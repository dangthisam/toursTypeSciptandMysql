import express from "express";

const router = express.Router();
import { getAllTours } from "../../controller/client/tours.controller";
router.get("/:slugCategory", getAllTours);

export default router;
