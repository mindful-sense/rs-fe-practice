import { configureStore } from "@reduxjs/toolkit";
import { modalReducer, userReducer } from "./features";

export const makeStore = () =>
  configureStore({
    reducer: { modal: modalReducer, user: userReducer },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
