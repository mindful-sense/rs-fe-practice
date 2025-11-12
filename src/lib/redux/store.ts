import { configureStore } from "@reduxjs/toolkit";
import {
  userReducer,
  usersReducer,
  postReducer,
  postsReducer,
} from "./features";

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
