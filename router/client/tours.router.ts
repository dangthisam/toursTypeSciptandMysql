import express from "express";

const router = express.Router();
import { getAllTours , detailTours } from "../../controller/client/tours.controller";
router.get("/:slugCategory", getAllTours);
router.get("/detail/:slugTour" , detailTours);
export default router;
