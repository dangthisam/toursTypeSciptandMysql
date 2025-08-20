
import express from "express";
const router=express.Router();
import { indexCategory , deleteCategory} from "../../controller/admin/category.controller";
router.get("/" , indexCategory);
router.delete("/delete/:id" , deleteCategory);
export default router;
