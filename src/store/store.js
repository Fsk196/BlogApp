import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import postsReducer from "../features/actions/post";

// const rootReducer = combineReducers({
//   auth: authReducer,
//   post: postsReducer,
// });

export const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postsReducer,
  },
});
