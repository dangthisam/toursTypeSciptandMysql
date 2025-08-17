
import express from "express";
const router=express.Router();
import { indexCategory } from "../../controller/admin/category.controller";
router.get("/" , indexCategory);
export default router;
