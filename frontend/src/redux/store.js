import { configureStore} from "@reduxjs/toolkit";
import AuthSlice from "./slices/AuthSlice";
import CourseSlice from "./slices/courseSlice"

const store = configureStore({
    reducer:{
        auth:AuthSlice,
        course:CourseSlice
    },
    devTools:true
})

export default store;