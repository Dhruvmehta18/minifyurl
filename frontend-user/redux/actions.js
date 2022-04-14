import API from "../api";
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
    API.post("v1/hash/minify", {
      original_url: textValue,
    })
      .then((response) => {
        if (response.status === 201) {
          dispatch(createMinifyLink());
          dispatch(setMinifyList([response.data]));
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch(errorCreateMinifyLink({ err }));
      });
  };
};

function addMinifyList() {
  return (dispatch) => {
    dispatch(loadingMinifyList());
    API.get("v1/hash/queryUrl?sortBy=creationTime")
      .then((response) => {
        const data = response.data;
        const results = data.results;
        dispatch(setMinifyList([...results]));
      })
      .catch((error) => {
        console.log(error);
        errorMinifyList({ error });
      });
  };
}

function fetchMinifyDetail(minifyId = "") {
  return (dispatch) => {
    dispatch(loadingMinifyLinkDetail());
    API.get(`v1/hash/${minifyId}`)
      .then((response) => {
        const data = response.data;
        dispatch(fetchMinifyLinkDetail(data));
      })
      .catch((error) => {
        console.log(error);
        errorMinifyLinkDetail({ error });
      });
  };
}

export { addMinifyList, postCreateMinifyLink, fetchMinifyDetail };
