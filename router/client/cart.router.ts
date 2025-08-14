import express from "express";

const router = express.Router();
import {indexCart} from "../../controller/client/cart.controller";
router.get("/" , indexCart);
export default router;
