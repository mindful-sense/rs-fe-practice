"use client";

import { type ReactNode, useEffect, useState } from "react";
import { Provider } from "react-redux";

import { type SafeUser } from "@/lib/db/schema";

import { makeStore } from "./store";
import { clearUser, setUser } from "./features";

export function StoreProvider({
  user,
  children,
}: {
  user: SafeUser | null;
  children: ReactNode;
}) {
  const [store] = useState(() => {
    const storeInstance = makeStore();
    if (user) storeInstance.dispatch(setUser(user));

    return storeInstance;
  });

  useEffect(() => {
    if (user) store.dispatch(setUser(user));
    else store.dispatch(clearUser());
  }, [user, store]);

  return <Provider store={store}>{children}</Provider>;
}
