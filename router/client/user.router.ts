

import express from "express";
const router=express.Router();
import {
    userRegister,
    userLogin,
    refreshToken,
    formRegister
} from "../../controller/client/user.controller"

router.get("/register", formRegister);
router.post("/register" , userRegister);
router.post("/login", userLogin);
router.post("/refresh", refreshToken);
export default router;