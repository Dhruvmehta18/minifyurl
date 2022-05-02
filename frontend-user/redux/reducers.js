import * as actionTypes from "./actionTypes";
import { ERROR, LOADED, LOADING } from "../constants";

const initialState = {
  minifyList: {
    requestState: LOADING,
    data: [],
    error: null,
  },
  createMinify: {
    requestState: LOADING,
    error: null,
  },
  minifyDetail: {
    requestState: LOADING,
    data: {},
    error: null,
  },
};

function reducer(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case actionTypes.LOADING_MINIFY_LIST:
      return {
        ...state,
        minifyList: {
          requestState: LOADING,
          data: [],
          error: null,
        },
      };
    case actionTypes.ERROR_MINIFY_LIST:
      return {
        ...state,
        minifyList: {
          requestState: ERROR,
          data: [],
          error: action.error,
        },
      };
    case actionTypes.ADD_MINIFY_LIST:
      return {
        ...state,
        minifyList: {
          requestState: LOADED,
          data: [...action.minifyList, ...state.minifyList.data],
          error: null,
        },
      };
    case actionTypes.LOADING_CREATE_MINIFY:
      return {
        ...state,
        createMinify: {
          requestState: LOADING,
          error: null,
        },
      };
    case actionTypes.ERROR_CREATE_MINIFY:
      return {
        ...state,
        createMinify: {
          requestState: ERROR,
          error: action.error,
        },
      };
    case actionTypes.CREATE_MINIFY:
      return {
        ...state,
        createMinify: {
          requestState: LOADED,
          error: null,
        },
      };
    case actionTypes.LOADING_MINIFY_DETAIL:
      return {
        ...state,
        minifyDetail: {
          requestState: LOADING,
          data: {},
          error: null,
        },
      };
    case actionTypes.ERROR_MINIFY_DETAIL:
      return {
        ...state,
        minifyDetail: {
          requestState: ERROR,
          data: {},
          error: action.error,
        },
      };
    case actionTypes.FETCH_MINIFY_DETAIL:
      return {
        ...state,
        minifyDetail: {
          requestState: LOADED,
          data: action.data,
          error: null,
        },
      };
    default:
      return state;
  }
}

export default reducer;
