import React from 'react';
import styles from './Preloader.module.css';

const Preloader = (props) => {
    return (
        <div className={styles.preloader}>
            <div className={styles.spinner}>{props.from}</div>
        </div>
        /* <img src={prealoder}
            width="40"
            style={{ position: 'absolute', top: 50 + '%', left: 50 + '%' }} /> */

    )
}
export default Preloader;