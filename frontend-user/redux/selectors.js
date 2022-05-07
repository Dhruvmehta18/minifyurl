const getMinifyList = (store) => {
  const { minifyReducer } = store;
  return minifyReducer.minifyList;
};
const createMinifyStatus = (store) => {
  const { minifyReducer } = store;
  return minifyReducer.createMinify;
};
const updateMinifyStatus = (store) => {
  const { minifyReducer } = store;
  return minifyReducer.updateMinify;
};
const getMinifyDetail = (store) => {
  const { minifyReducer } = store;
  return minifyReducer.minifyDetail;
};

export { getMinifyList, createMinifyStatus, getMinifyDetail, updateMinifyStatus };
