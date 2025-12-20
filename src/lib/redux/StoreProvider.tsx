// "use client";

// import { type ReactNode, useState } from "react";
// import { Provider } from "react-redux";
// import { type AppStore, type RootState, makeStore } from "./store";

// export function StoreProvider({
//   children,
//   preloadedState,
// }: {
//   children: ReactNode;
//   preloadedState?: Partial<RootState>;
// }) {
//   const [store] = useState<AppStore>(() => makeStore(preloadedState));

//   return <Provider store={store}>{children}</Provider>;
// }
