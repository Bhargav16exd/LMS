import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { createCourse, createLecture, deleteCourse, deleteLecture, editLecture, listCourses, updateCourse, updateThumbnail, viewLecture } from "../controllers/course.controller.js";
import { authMiddleware, isAuthorized} from "../middlewares/auth.middleware.js";


const router = Router()



// Public Routes

router.route("/list-courses").get(listCourses)

// Authorized Routes
router.route("/:courseId/view-lectures").get(authMiddleware,viewLecture)

// Admin

router.route("/create-course").post(authMiddleware,isAuthorized,upload.single("thumbnail"),createCourse)
router.route("/:courseId/edit-thumbnail").post(authMiddleware,isAuthorized, upload.single("thumbnail"),updateThumbnail)
router.route("/:courseId/delete-course").post(authMiddleware,isAuthorized,deleteCourse)
router.route("/:courseId/edit-course").post(authMiddleware, isAuthorized,updateCourse)


router.route("/:courseId/create-lecture").post(authMiddleware,isAuthorized,upload.single("video"),createLecture)
router.route("/:courseId/edit-lecture/:lectureId").post(authMiddleware,isAuthorized,editLecture)
router.route("/:courseId/delete-lecture/:lectureId").post(authMiddleware,isAuthorized,deleteLecture)






export default router;