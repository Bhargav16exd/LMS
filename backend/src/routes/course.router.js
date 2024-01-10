import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { createCourse, listCourses } from "../controllers/course.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";


const router = Router()



// Public Routes
router.route("/create-course").post(authMiddleware,upload.single("thumbnail"),createCourse)
router.route("/list-courses").get(listCourses)


export default router;