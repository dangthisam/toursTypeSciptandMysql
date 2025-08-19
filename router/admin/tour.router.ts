import express from "express";
import multer from "multer";
import{ uploadFields} from "../../middleware/admin/uploadCould.middleware"
const router = express.Router();
const upload=multer()
import {
  indexTour,
  createTour,
  postCreateTour,
  deletour
} from "../../controller/admin/tour.controller";
router.get("/", indexTour);
router.get("/create", createTour);
router.delete("/delete/:id" , deletour);
router.post(
  
  "/create", 
  upload.fields([{ name: 'images', maxCount: 10 }]),
  uploadFields,
  postCreateTour);

export default router;
