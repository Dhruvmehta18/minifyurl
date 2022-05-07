import React, { memo, useEffect, useState } from "react";
import styles from "../../styles/Home.module.scss";

const index = ({ sideDrawerOpen, onToggle, sideDrawerHeaderText, sideDrawerContentElement, sideDrawerBottomElement, onOverlayClicked }) => {
  return (
    <div
      className={[
        styles.sideDrawerMain,
        sideDrawerOpen ? styles.open : styles.close,
      ].join(" ")}
    >
      <div className={styles.sideOverlay} onClick={onOverlayClicked}></div>
      <div className={styles.sideDrawer}>
        <div className={styles.sideDrawerContainer}>
          <div className={styles.sideDrawerHeader}>
            <h2>{sideDrawerHeaderText}</h2>
            <span className={styles.closeIcon} onClick={onToggle}>
              x
            </span>
          </div>

          <div className={styles.sideDrawerContent}>
            {sideDrawerContentElement}
          </div>

          <div className={styles.sideDrawerBottom}>
              {sideDrawerBottomElement}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(index);
