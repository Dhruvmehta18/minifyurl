import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../axios";

export const AuthStates = {
  IDLE: "idle",
  LOADING: "loading",
};

export const fetchUser = createAsyncThunk("auth/me", async (_, thunkAPI) => {
  try {
    const response = await axiosInstance.get("api/me");
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message });
  }
});

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await axiosInstance.post("api/login", credentials);
      return {
        accessToken: response.data.tokens.access.token,
        refreshToken: response.data.tokens.refresh.token,
        me: response.data.user,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const response = await axiosInstance.post("api/register", credentials);
      return {
        accessToken: response.data.tokens.access.token,
        refreshToken: response.data.tokens.refresh.token,
        me: response.data.user,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    const response = await axiosInstance.delete("api/logout");
    axiosInstance.defaults.headers.Authorization = ``;
    sessionStorage.clear();
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message });
  }
});

const internalInitialState = {
  accessToken: "",
  refreshToken: "",
  loading: AuthStates.IDLE,
  me: null,
  fetchUserCount: 0,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: internalInitialState,
  reducers: {
    updateAccessToken(state, action) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    reset: () => internalInitialState,
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.me = action.payload.me;
      state.loading = AuthStates.IDLE;
    });
    builder.addCase(login.rejected, (state, action) => {
      state = { ...internalInitialState, error: action.error };
      throw new Error(action.error.message);
    });
    builder.addCase(logout.pending, (state) => {
      state.loading = AuthStates.LOADING;
    });
    builder.addCase(logout.fulfilled, (_state) => internalInitialState);
    builder.addCase(login.pending, (state) => {
      state.loading = AuthStates.LOADING;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.me = action.payload.me;
      state.loading = AuthStates.IDLE;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.error = action.error;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state = { ...internalInitialState, error: action.error, fetchUserCount: state.fetchUserCount+1 };
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.me = action.payload;
      state.fetchUserCount = state.fetchUserCount+1;
    });
  },
});

export const { updateAccessToken, reset } = authSlice.actions;

export default authSlice.reducer;
