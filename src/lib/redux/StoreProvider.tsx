"use client";

import type { ReactNode } from "react";
import type { SessionUser } from "@/features/users/shared";

import { useEffect, useState } from "react";
import { Provider } from "react-redux";

import { makeStore } from "./store";
import { clearUser, setUser } from "./features";

interface Props {
  user: SessionUser | null;
  children: ReactNode;
}

export function StoreProvider({ user, children }: Props) {
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
