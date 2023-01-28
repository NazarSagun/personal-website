import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import noteSlice from "../features/notes/noteSlice";

export const store = configureStore({
  reducer: {
    note: noteSlice,
    auth: authSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
