import React, { memo, useState } from "react";
import styles from "../../styles/component/OrbRadio.module.scss";

const index = memo(()=> {

  const [onToggle, onToggleChange] = useState(false);

  const onBitlinksClicked = () => {
    onToggleChange(true);
  };

  const onPerformanceClicked = () => {
    onToggleChange(false);
  };

  return (
    <div className={styles.orbRadio}>
      <label className={styles.item} htmlFor="bitlinks" onClick={onBitlinksClicked}>
        <span className={styles.wrapper}>
          <input
            type="radio"
            name="graph-view-selector"
            id="bitlinks"
            value="bitlinks"
            readOnly
            checked={onToggle}
          />
          <span className={styles.dot}></span>
          <span className={styles.label}>Date Created</span>
        </span>
      </label>
      <label className={styles.item} htmlFor="performance" onClick={onPerformanceClicked}>
        <span className={styles.wrapper}>
          <input
            type="radio"
            name="graph-view-selector"
            id="performance"
            value="performance"
            readOnly
            checked={!onToggle}
          />
          <span className={styles.dot}></span>
          <span className={styles.label}>Top Performing</span>
        </span>
      </label>
    </div>
  );
})

export default index;
