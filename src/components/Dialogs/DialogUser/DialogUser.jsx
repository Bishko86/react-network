import React from 'react';
import { NavLink } from 'react-router-dom';
import AvatarUser from '../../../common/AvatarUser/AvatarUser';
import style from './DialogUser.module.css';

const DialogUser = (props) => {

    let path = '/dialogs/' + props.id;
    return (
        <div className={style.dialog_item}>
            <AvatarUser
                url={props.url}
                width={50}
                height={50}
                radius={'10px'}
            />
            <NavLink className={style.user} to={path} activeClassName={style.active}> {props.name} </NavLink>
        </div >
    )
}
export default DialogUser;