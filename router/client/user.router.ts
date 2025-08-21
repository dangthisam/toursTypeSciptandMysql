

import express from "express";
const router=express.Router();
import {
    userRegister,
    userLogin
} from "../../controller/client/user.controller"
router.post("/register" , userRegister);
router.post("/login", userLogin);
export default router;