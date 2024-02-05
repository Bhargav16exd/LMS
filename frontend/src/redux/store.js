import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./slices/AuthSlice";
import CourseSlice from "./slices/courseSlice";
import LectureSlice from "./slices/LectureSlice";
import { logout } from "./slices/AuthSlice";

const logoutOnUnload = (store) => (next) => (action) => {
  window.addEventListener("beforeunload", () => {
    store.dispatch(logout());
  });

  return next(action);
};

const store = configureStore({
  reducer: {
    auth: AuthSlice,
    course: CourseSlice,
    lecture: LectureSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logoutOnUnload),
  devTools: true,
});

export default store;

