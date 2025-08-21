import express from "express";
const router = express.Router();
import { getAllCategories } from "../../controller/client/categories.controller";
import authenticateToken from "../../middleware/client/jwtAuth.middleware"
router.get("/" ,authenticateToken, getAllCategories)
export default router;
