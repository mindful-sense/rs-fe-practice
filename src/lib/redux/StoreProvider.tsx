"use client";

import { type ReactNode, useState } from "react";
import { Provider } from "react-redux";
import { type AppStore, makeStore } from "./store";

export function StoreProvider({ children }: { children: ReactNode }) {
  const [store] = useState<AppStore>(() => makeStore());

  return <Provider store={store}>{children}</Provider>;
}
