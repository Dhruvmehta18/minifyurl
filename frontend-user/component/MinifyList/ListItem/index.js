import React from 'react';
import 'index.scss';

function index(props) {
    return (
        <div className={styles.linkListItemWrapper} key={i}>

                  <div className={styles.linkListItem} >
                    <div className={styles.checkboxContainer}>
                        <span className={styles.itemCheckbox}>
                          <div className="checkbox--SMALL">
                          <input
                            id="3wUECjG" type="checkbox" className="checkbox--input"/>
                          <label tabIndex="0" htmlFor="3wUECjG" className="checkmark-icon checkbox-icon">
                          </label>
                        </div>
                        </span>
                    </div>
                    <div className={styles.listItemData}>
                      <div className={styles.topLineData}>
                        <time className={styles.linkCreatedAt} dateTime="2020-02-26">Feb 16</time>
                        <div className={styles.iconTags}>
                          tags
                        </div>
                      </div>
                      <div className={styles.secondLineData}>
                        <div className={styles.linkTitle}>Designing a URL Shortening service like TinyURL - Grokking the System Design Interview</div>
                      </div>
                      <div className={styles.bottomLineData}>
                        <a href="https://bit.ly/first-35G" className={styles.shortLink}>bit.ly/first-35G</a>
                      </div>
                    </div>
                  </div>
                </div>
    );
}

export default index;