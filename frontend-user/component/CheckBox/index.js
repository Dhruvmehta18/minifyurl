import React from 'react';
import styles from '../../styles/component/CheckBox.module.scss';

function index(props) {
    return (
        <div className={styles.checkBoxContainer}>
            <input type="checkbox" className={styles.checkBoxInput} />
        </div>
    );
}

export default index;