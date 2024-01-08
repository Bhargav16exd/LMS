import {Router} from "express";
import {upload} from "../middlewares/multer.middleware.js"
import { login, logout, register, userProfile } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

// User Routes 

router.route("/register").post( upload.single("avatar"),register )
router.route("/login").post( login )

//secured routes
router.route("/logout").post(authMiddleware,logout)
router.route("/getProfile").post(authMiddleware,userProfile)


export default router;
