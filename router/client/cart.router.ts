import express from "express";

const router = express.Router();
import {indexCart , dataCart} from "../../controller/client/cart.controller";
router.get("/" , indexCart);
router.post("/list-json" , dataCart);
export default router;
