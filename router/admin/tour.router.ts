import express from "express";
const router = express.Router();
import {
  indexTour,
  createTour,
  postCreateTour,
} from "../../controller/admin/tour.controller";
router.get("/", indexTour);
router.get("/create", createTour);
router.post("/create", postCreateTour);

export default router;
