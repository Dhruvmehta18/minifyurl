import axios from "../lib/axios";
import * as actionTypes from "./actionTypes";

const setMinifyList = (minifyList) => {
  return { type: actionTypes.ADD_MINIFY_LIST, minifyList: [...minifyList] };
};

const loadingMinifyList = () => {
  return { type: actionTypes.LOADING_MINIFY_LIST, minifyList: {} };
};

const errorMinifyList = (error) => {
  return { type: actionTypes.ERROR_MINIFY_LIST, error: error };
};

const loadingCreateMinifyLink = () => {
  return { type: actionTypes.LOADING_CREATE_MINIFY };
};

const createMinifyLink = () => {
  return { type: actionTypes.CREATE_MINIFY };
};

const errorCreateMinifyLink = (error) => {
  return { type: actionTypes.ERROR_CREATE_MINIFY, error: error };
};

const loadingMinifyLinkDetail = () => {
  return { type: actionTypes.LOADING_MINIFY_DETAIL };
};

const fetchMinifyLinkDetail = (data) => {
  return { type: actionTypes.FETCH_MINIFY_DETAIL, data: data };
};

const errorMinifyLinkDetail = (error) => {
  return { type: actionTypes.ERROR_MINIFY_DETAIL, error: error };
};

const postCreateMinifyLink = (textValue = "") => {
  return (dispatch) => {
    dispatch(loadingCreateMinifyLink());
    axios.post("api/hash/createMinifyLink", {
      original_url: textValue,
    })
      .then((response) => {
        if (response.status === 201) {
          dispatch(createMinifyLink());
          dispatch(setMinifyList([response.data]));
        }
      })
      .catch((err) => {
        dispatch(errorCreateMinifyLink({ err }));
      });
  };
};

function addMinifyList() {
  return (dispatch) => {
    dispatch(loadingMinifyList());
    axios.get("api/hash/minifyList")
      .then((response) => {
        const data = response.data;
        const results = data.results;
        dispatch(setMinifyList([...results]));
      })
      .catch((error) => {
        errorMinifyList({ error });
      });
  };
}

function fetchMinifyDetail(minifyId = "") {
  return (dispatch) => {
    dispatch(loadingMinifyLinkDetail());
    axios.get(`api/hash/${minifyId}`)
      .then((response) => {
        const data = response.data;
        dispatch(fetchMinifyLinkDetail(data));
      })
      .catch((error) => {
        errorMinifyLinkDetail({ error });
      });
  };
}

export { addMinifyList, postCreateMinifyLink, fetchMinifyDetail };
