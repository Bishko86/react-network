import React from 'react';
import { NavLink } from 'react-router-dom';
import ToggleButton from '../../common/ToggleButton';
import AvatarUser from '../../common/AvatarUser/AvatarUser';
import style from './Users.module.css';
import { ItemsUserType } from './../../types/types'

type PropsType = {
  followingInProgress: Array<number>
  user: ItemsUserType
  unFollow: (id: number) => void
  follow: (id: number) => void
}
const User = ({ user, followingInProgress, unFollow, follow }: PropsType) => {
  // debugger
  return (
    <div className={style.userBlock} >
      <div className={style.avatar}>
        <NavLink to={`profile/${user.id}`}>
          <AvatarUser url={user.photos.large || 'https://st2.depositphotos.com/2703645/5669/v/950/depositphotos_56695985-stock-illustration-male-avatar.jpg'} radius={'10px'} width={50} height={50} />
        </NavLink>
        {user.followed ?

          <ToggleButton followingInProgress={followingInProgress}
            followUnfollow={unFollow} userId={user.id} value='Unfollow'
          />
          :
          <ToggleButton followingInProgress={followingInProgress}
            followUnfollow={follow} userId={user.id} value='Follow'
          />

        }

      </div>
      <div className={style.userInfo}>
        <div>
          <h3>{user.name}</h3>
          <p>{user.status || null}
            {user.id}</p>
        </div>
      </div>
    </div>

  )
}

export default User;