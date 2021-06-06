import React from 'react';
import User from './User'
import { ItemsUserType } from './../../types/types'

type PropsType = {
    followingInProgress: Array<number>
    users: Array<ItemsUserType>
    unFollow: (id: number) => void
    follow: (id: number) => void
}
const Users: Function = ({ followingInProgress, users, unFollow, follow }: PropsType): JSX.Element[] => {
    // debugger

    return (users.map((user) => {
        return (
            <User
                key={user.id}
                user={user}
                followingInProgress={followingInProgress}
                unFollow={unFollow}
                follow={follow} />
        )
    }))
}

export default Users;