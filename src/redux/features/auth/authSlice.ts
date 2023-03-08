import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { IUser } from "../../../http/models/IUser";
import AuthService from "../../../services/AuthService";
import { API_URL } from "../../../http";
import {
  AuthResponse,
  ResponseError,
} from "../../../http/models/auth-response";

export const login = createAsyncThunk(
  "auth/login",
  async (
    userData: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await AuthService.login(
        userData.email,
        userData.password
      );

      if (response.data.status === 400) {
        return rejectWithValue(response.data.message);
      }
      localStorage.setItem("token", response.data.accessToken);
      return response.data;
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue("rejection error");
    }
  }
);

export const registration = createAsyncThunk(
  "auth/registration",
  async (
    userData: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await AuthService.registration(
        userData.email,
        userData.password
      );
      console.log(response.data)
      if (response.data.status === 400) {
        console.log(response.data);
        return rejectWithValue(response.data.message);
      }
      localStorage.setItem("token", response.data.accessToken);
      return response.data;
    } catch (error) {
      return rejectWithValue("Unexpected Error");
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await AuthService.logout();
  localStorage.removeItem("token");
  return "logged out";
});

export const checkAuth = createAsyncThunk("auth/checkAuth", async (id,{ rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}/refresh`, {
      withCredentials: true,
    });
    // console.log(response)
    if (response.data.status === 401) {
      return rejectWithValue( response.data.message);
    }
    const data = response.data;
    localStorage.setItem("token", data.accessToken);
    return data.user;
  } catch (e: any) {
    console.log(e.response.data.message);
  }
});

const initialState = {
  user: {} as IUser,
  isAuth: false,
  status: "idle",
  message: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.isAuth = true;
      state.status = "completed";
    });
    builder.addCase(login.rejected, (state, action: any) => {
      state.isAuth = false;
      state.status = "rejected";
      state.message = action.payload;
    });
    builder.addCase(
      registration.fulfilled,
      (state, action: PayloadAction<AuthResponse>) => {
        state.user = action.payload.user;
        state.isAuth = true;
        state.status = "completed";
      }
    );
    builder.addCase(registration.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(registration.rejected, (state, action: any) => {
      state.status = "rejected";
      state.message = action.payload;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.user = {} as IUser;
      state.isAuth = false;
      state.status = "idle";
    });
    builder.addCase(checkAuth.fulfilled, (state, action: any) => {
      state.status = "completed";
      state.isAuth = true;
      state.user = action.payload;
    });
    builder.addCase(checkAuth.pending, (state, action: any) => {
      state.status = "loading";
    });
    builder.addCase(checkAuth.rejected, (state, action: any) => {
      state.isAuth = false;
      state.message = action.payload;
      state.status = "rejected";
    });
  },
});

export default authSlice.reducer;
