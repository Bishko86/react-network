import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import AvatarUser from '../Dialogs/AvatarUser/AvatarUser';
import style from './Users.module.css';
import User from './User'

const Users = (props) => {

    return (props.users.map((user) => {

        return (
            <User user={user}
                {...props} key={user.id} />
        )
    }))
}

export default Users;