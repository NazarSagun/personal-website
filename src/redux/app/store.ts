import { Action, configureStore, ThunkAction, PreloadedState, combineReducers } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import shopSlice from "../features/shop/shopSlice";

 export const rootReducer = combineReducers({
  auth: authSlice,
  shop: shopSlice
})

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  });
}

// export const store = configureStore({
//   reducer: {
//     note: noteSlice,
//     auth: authSlice
//   },
// });

// export type AppDispatch = typeof store.dispatch;
// export type RootState = ReturnType<typeof store.getState>;
export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
