import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { createCourse, createLecture, deleteCourse, deleteLecture, listCourses, updateCourse, updateThumbnail, viewLecture } from "../controllers/course.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";


const router = Router()



// Public Routes

router.route("/list-courses").get(listCourses)




// Authorized Routes

router.route("/create-course").post(authMiddleware,upload.single("thumbnail"),createCourse)
router.route("/:courseId/edit-thumbnail").post(authMiddleware,upload.single("thumbnail"),updateThumbnail)
router.route("/:courseId/delete-course").post(authMiddleware,deleteCourse)
router.route("/:courseId/edit-course").post(authMiddleware,updateCourse)

router.route("/:courseId/view-lectures").get(authMiddleware,viewLecture)
router.route("/:courseId/create-lecture").post(authMiddleware,upload.single("video"),createLecture)
router.route("/:courseId/delete-lecture/:lectureId").post(authMiddleware,deleteLecture)






export default router;