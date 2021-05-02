import React from 'react';
import style from './AvatarUser.module.css';

const AvatarUser = (props) => {

    return (
        <div className={style.avatar}>
            <img src={props.url} alt="" />
        </div>
    );
}
export default AvatarUser;