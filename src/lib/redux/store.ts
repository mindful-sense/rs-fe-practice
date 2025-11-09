import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./features/post/postsSlice";
import postReducer from "./features/posts/postSlice";
import userReducer from "./features/user/userSlice";
import usersReducer from "./features/users/usersSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      user: userReducer,
      users: usersReducer,
      post: postReducer,
      posts: postsReducer,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
