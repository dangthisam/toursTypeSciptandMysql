
import express from "express";
const router=express.Router();
import { indexTour } from "../../controller/admin/tour.controller";
router.get("/" , indexTour);
export default router;
