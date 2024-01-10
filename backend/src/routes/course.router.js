import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { createCourse, createLecture, listCourses, viewLecture } from "../controllers/course.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";


const router = Router()



// Public Routes
router.route("/create-course").post(authMiddleware,upload.single("thumbnail"),createCourse)
router.route("/list-courses").get(listCourses)

// Authorized Routes
router.route("/:courseId/create-lecture").post(authMiddleware,upload.single("video"),createLecture)
router.route("/:courseId/view-lectures").get(authMiddleware,viewLecture)




export default router;