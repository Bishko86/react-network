import React, { Fragment } from 'react';
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