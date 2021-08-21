import React from 'react';

import ListItem from "./ListItem";

import styles from "../../styles/component/MinifyList/MinifyList.module.scss";

const index = () => {
    return (
        <div className={styles.linksList}>
              <div>
                {[...Array(15)].map((x, i) => (
                    <ListItem key={i}/>
                  ))}
              </div>
            </div>
    );
};

export default index;