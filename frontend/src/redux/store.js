import { configureStore} from "@reduxjs/toolkit";
import AuthSlice from "./slices/AuthSlice";
import CourseSlice from "./slices/courseSlice"
import LectureSlice from "./slices/LectureSlice";

const store = configureStore({
    reducer:{
        auth:AuthSlice,
        course:CourseSlice,
        lecture:LectureSlice
    },
    devTools:true
})

export default store;