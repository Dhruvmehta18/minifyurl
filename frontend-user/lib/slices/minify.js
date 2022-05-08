import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ERROR, LOADED, LOADING } from "../../constants";
import axiosInstance from "../axios";

export const MinifyLoadStates = {
  LOADED: LOADED,
  LOADING: LOADING,
  ERROR: ERROR,
};

export const postCreateMinifyLink = createAsyncThunk(
  "minify/postCreateMinifyLink",
  async (textValue = "", thunkAPI) => {
    try {
      axiosInstance.defaults.headers.Authorization = `Bearer ${localStorage.getItem(
        "accessToken"
      )}`;

      const response = await axiosInstance.post("api/hash/createMinifyLink", {
        original_url: textValue,
      });
      if (response.status === 201) {
        return {
          minifyLink: response.data,
        };
      } else {
        return thunkAPI.rejectWithValue({ error: "Something went wrong" });
      }
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const postUpdateMinifyLink = createAsyncThunk(
  "minify/postUpdateMinifyLink",
  async (parameters, thunkAPI) => {
    const { original_url, minify_id, title } = parameters;
    try {
      axiosInstance.defaults.headers.Authorization = `Bearer ${localStorage.getItem(
        "accessToken"
      )}`;

      const response = await axiosInstance.post("api/hash/updateMinifyLink", {
        original_url: original_url,
        minify_id: minify_id,
        title: title,
      });
      if (response.status === 200) {
        return {
          minifyLink: response.data,
        };
      } else {
        return thunkAPI.rejectWithValue({ error: "Something went wrong" });
      }
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const addMinifyList = createAsyncThunk(
  "minify/addMinifyList",
  async (_a, thunkAPI) => {
    try {
      axiosInstance.defaults.headers.Authorization = `Bearer ${localStorage.getItem(
        "accessToken"
      )}`;
      const response = await axiosInstance.get("api/hash/minifyList");
      return {
        minifyList: [...response.data.results],
      };
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
export const fetchMinifyDetail = createAsyncThunk(
  "minify/fetchMinifyDetail",
  async (minifyId = "", thunkAPI) => {
    try {
      axiosInstance.defaults.headers.Authorization = `Bearer ${localStorage.getItem(
        "accessToken"
      )}`;

      const response = await axiosInstance.get(
        `api/hash/minifyDetail/${minifyId}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const internalInitialState = {
  minifyList: {
    requestState: MinifyLoadStates.LOADING,
    data: [],
    error: null,
  },
  createMinify: {
    requestState: MinifyLoadStates.LOADING,
    error: null,
  },
  updateMinify: {
    requestState: MinifyLoadStates.LOADING,
    error: null,
  },
  minifyDetail: {
    requestState: MinifyLoadStates.LOADING,
    data: {},
    error: null,
  },
};

export const minifySlice = createSlice({
  name: "minify",
  initialState: internalInitialState,
  reducers: {
    reset: () => internalInitialState,
  },
  extraReducers: (builder) => {
    builder.addCase(postCreateMinifyLink.fulfilled, (state, action) => {
      state.createMinify = {
        requestState: MinifyLoadStates.LOADED,
        error: null,
      };
      state.minifyList = {
        requestState: MinifyLoadStates.LOADED,
        data: [...state.minifyList.data, action.payload.minifyLink],
        error: null,
      };
    });
    builder.addCase(postCreateMinifyLink.rejected, (state, action) => {
      state.createMinify = {
        requestState: MinifyLoadStates.ERROR,
        error: action.error,
      };
      state.minifyList = {
        ...state.minifyList,
        error: action.payload.error,
      };
      throw new Error(action.error);
    });
    builder.addCase(postCreateMinifyLink.pending, (state) => {
      state.createMinify = {
        requestState: MinifyLoadStates.LOADING,
        error: null,
      };
    });
    builder.addCase(addMinifyList.fulfilled, (state, action) => {
      state.minifyList = {
        requestState: MinifyLoadStates.LOADED,
        data: [...action.payload.minifyList],
        error: null,
      };
    });
    builder.addCase(addMinifyList.pending, (state) => {
      state.minifyList = {
        requestState: MinifyLoadStates.LOADING,
        data: [],
        error: null,
      };
    });
    builder.addCase(addMinifyList.rejected, (state, action) => {
      state.minifyList = {
        requestState: MinifyLoadStates.ERROR,
        data: [],
        error: action.error,
      };
    });
    builder.addCase(fetchMinifyDetail.rejected, (state, action) => {
      state.minifyDetail = {
        requestState: MinifyLoadStates.ERROR,
        data: {},
        error: action.error,
      };
    });
    builder.addCase(fetchMinifyDetail.fulfilled, (state, action) => {
      state.minifyDetail = {
        requestState: MinifyLoadStates.LOADED,
        data: action.payload,
        error: null,
      };
    });
    builder.addCase(fetchMinifyDetail.pending, (state, action) => {
      state.minifyDetail = {
        requestState: MinifyLoadStates.LOADING,
        data: {},
        error: null,
      };
    });
    builder.addCase(postUpdateMinifyLink.fulfilled, (state, action) => {
      state.updateMinify = {
        requestState: MinifyLoadStates.LOADED,
        error: null,
      };
      state.minifyDetail = {
        requestState: MinifyLoadStates.LOADED,
        data: action.payload.minifyLink,
        error: null,
      };
    });
    builder.addCase(postUpdateMinifyLink.rejected, (state, action) => {
      state.updateMinify = {
        requestState: MinifyLoadStates.ERROR,
        error: "Error",
      };
    });
    builder.addCase(postUpdateMinifyLink.pending, (state) => {
      state.updateMinify = {
        requestState: MinifyLoadStates.LOADING,
        error: null,
      };
    });
  },
});

export const { updateAccessToken, reset } = minifySlice.actions;

export default minifySlice.reducer;
