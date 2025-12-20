// import { configureStore } from "@reduxjs/toolkit";
// import { api } from "./api";
// import {
//   userReducer,
//   usersReducer,
//   postReducer,
//   postsReducer,
// } from "./features";

// export const makeStore = (preloadedState?: Partial<RootState>) =>
//   configureStore({
//     reducer: {
//       user: userReducer,
//       users: usersReducer,
//       post: postReducer,
//       posts: postsReducer,
//       [api.reducerPath]: api.reducer,
//     },
//     middleware: (getDefaultMiddleware) =>
//       getDefaultMiddleware().concat(api.middleware),
//     preloadedState: preloadedState as RootState | undefined,
//   });

// export type AppStore = ReturnType<typeof makeStore>;
// export type AppDispatch = AppStore["dispatch"];
// export type RootState = {
//   user: ReturnType<typeof userReducer>;
//   [api.reducerPath]: ReturnType<typeof api.reducer>;
// };
