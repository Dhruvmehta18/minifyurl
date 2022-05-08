import React, { memo, useState } from "react";
import styles from "../../styles/Home.module.scss";
import MinifyList from "../MinifyList";
import MinifyListItemDetail from "../MinifyListItemDetail";

const index = () => {
  const [minifyIdentifier, setMinifyIdentifier] = useState("");
  const onMinifyListItemClicked = (minifyId) => {
    setMinifyIdentifier(minifyId);
  };

  return (
    <div className={styles.linksWrapper}>
      <div className={styles.linksContainer}>
        <MinifyList onMinifyListItemClicked={onMinifyListItemClicked}/>
        <MinifyListItemDetail minifyIdentity={minifyIdentifier} />
      </div>
    </div>
  );
};

export default index;
