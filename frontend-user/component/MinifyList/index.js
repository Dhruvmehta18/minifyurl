import React, { memo, useEffect, useMemo, useState } from "react";

import ListItem from "./ListItem";

import styles from "../../styles/component/MinifyList/MinifyList.module.scss";
import { addMinifyList } from "../../redux/actions";
import { getMinifyList } from "../../redux/selectors";
import { connect } from "react-redux";

const index = ({ fetchMinifyList, minifyList, onMinifyListItemClicked }) => {
  const {
    requestState,
    data,
    error,
  } = minifyList;
  useEffect(() => {
    fetchMinifyList();
  }, []);

  return (
    <div className={styles.linksList}>
      <div>
        {data &&
          data.map((value) => (
            <ListItem
              key={value.id}
              originalLink={value.originalLink}
              minifyId={value.minifyId}
              creationTime={value.creationTime}
              onMinifyListItemClicked={onMinifyListItemClicked}
            />
          ))}
      </div>
    </div>
  );
};

function mapStateToProps(state, _ownProps) {
  return {
    minifyList: getMinifyList(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMinifyList: () => dispatch(addMinifyList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
