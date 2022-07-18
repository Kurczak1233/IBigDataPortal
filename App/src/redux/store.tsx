import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistReducer,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import applicationUserReducer from "./slices/applicationUserSlice";
import accessTokenReducer from "./slices/accessTokenSlice";
import resetFiltersFlags from "./slices/resetFiltersFlags";
import articlesReducer from "./slices/articlesSlice";
import cooperationsReducer from "./slices/cooperationsSlice";

const reducers = combineReducers({
  applicationUserReducer,
  accessTokenReducer,
  resetFiltersFlags,
  articlesReducer,
  cooperationsReducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export type RootState = ReturnType<typeof store.getState>;
export const persistor = persistStore(store);
