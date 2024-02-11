"use client";
import { Provider } from "react-redux";
import persistStore from "redux-persist/es/persistStore";
import { PersistGate } from "redux-persist/integration/react";
import { store } from "../lib/store";
import Loader from "./_components/loader/Loader";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate
        loading={
          <Loader customClassName="full-height-loader" />
        }
        persistor={persistor}
      >
        {children}
      </PersistGate>
    </Provider>
  );
}
