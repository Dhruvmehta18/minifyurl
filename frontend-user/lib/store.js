import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import { authSlice } from "./slices/auth";
import { minifySlice } from "./slices/minify";

// Combine all the slices we created together.
const combinedReducers = combineReducers({
  authReducer: authSlice.reducer,
  minifyReducer: minifySlice.reducer,
});

const rootReducer = (state, action) => {
  console.log(state, action);
  if (action.type === HYDRATE) {
    const nextState = {
      ...action.payload,
      ...state,
    };
    if (
      state.authReducer.accessToken !== null &&
      state.authReducer.accessToken !== ""
    ) {
      nextState.authReducer = { ...state.authReducer };
    }
    console.log("nextState", nextState);
    return nextState;
  } else {
    return combinedReducers(state, action);
  }
};

const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    devTools: true,
  });

export const wrapper = createWrapper(makeStore, {
  storeKey: "key",
  debug: true,
});
