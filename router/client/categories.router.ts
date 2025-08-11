import express from "express";
const router = express.Router();
import { getAllCategories } from "../../controller/client/categories.controller";
router.get("/" , getAllCategories)
export default router;
