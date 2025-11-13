import { configureStore } from "@reduxjs/toolkit";
import {
  userReducer,
  usersReducer,
  postReducer,
  postsReducer,
} from "./features";

export const makeStore = (preloadedState?: Partial<RootState>) =>
  configureStore({
    reducer: {
      user: userReducer,
      users: usersReducer,
      post: postReducer,
      posts: postsReducer,
    },
    preloadedState: preloadedState as RootState | undefined,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = { user: ReturnType<typeof userReducer> };
export type AppDispatch = AppStore["dispatch"];
