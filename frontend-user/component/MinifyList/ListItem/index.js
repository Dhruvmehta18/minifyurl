import React from 'react';
import { REDIRECT_SERVICE_URL } from '../../../lib/config/config';
import getRedirectUrl from '../../../lib/utility/getRedirectUrl';
import styles from "../../../styles/component/MinifyList/ListItem.module.scss";

function index({minifyId, originalLink, creationTime, onMinifyListItemClicked}) {
    return (
      <div className={styles.linkListItemWrapper} onClick={()=>onMinifyListItemClicked(minifyId)}>
      <div className={styles.linkListItem}>
        <div className={styles.checkboxContainer}>
          <span className={styles.itemCheckbox}>
            <div className="checkbox--SMALL">
              <input
                id={minifyId}
                type="checkbox"
                className="checkbox--input"
              />
              <label
                tabIndex="0"
                htmlFor={minifyId}
                className="checkmark-icon checkbox-icon"
              ></label>
            </div>
          </span>
        </div>
        <div className={styles.listItemData}>
          <div className={styles.topLineData}>
            <time
              className={styles.linkCreatedAt}
              dateTime={creationTime}
            >
              {creationTime}
            </time>
            <div className={styles.iconTags}>tags</div>
          </div>
          <div className={styles.secondLineData}>
            <div className={styles.linkTitle}>
              {originalLink}
            </div>
          </div>
          <div className={styles.bottomLineData}>
            <a
              href={getRedirectUrl(minifyId)}
              className={styles.shortLink}
              target="_blank"
            >
              {REDIRECT_SERVICE_URL}/<b>{minifyId}</b>
            </a>
          </div>
        </div>
      </div>
    </div>
    );
}

export default index;