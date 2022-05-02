import React, { useEffect } from "react";

import ListItem from "./ListItem";

import styles from "../../styles/component/MinifyList/MinifyList.module.scss";
import { getMinifyList } from "../../redux/selectors";
import { useDispatch, useSelector } from "react-redux";
import { addMinifyList } from "../../lib/slices/minify";

const index = ({ onMinifyListItemClicked }) => {
  const dispatch = useDispatch()

  const minifyList = useSelector((state)=>getMinifyList(state));

  const { requestState, data, error } = minifyList;

  useEffect(() => {
    console.log(requestState, data, error);
    let myTimeout;
    if (requestState == "loading"){ 
      myTimeout = setTimeout(() => {
        dispatch(addMinifyList())
      }, 1000);
    };
    return ()=>{
      if(myTimeout)
        clearTimeout(myTimeout);
    }
  }, [dispatch, requestState]);

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

export default index;
