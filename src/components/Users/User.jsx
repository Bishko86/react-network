import React from 'react';
import { NavLink } from 'react-router-dom';
import ToggleButton from '../../common/ToggleButton';
import AvatarUser from '../../common/AvatarUser/AvatarUser';
import style from './Users.module.css';

const User = ({ user, ...props }) => {
  return (
    <div className={style.userBlock} >
      <div className={style.avatar}>
        <NavLink to={`profile/${user.id}`}>
          <AvatarUser url={user.photos.large || 'https://st2.depositphotos.com/2703645/5669/v/950/depositphotos_56695985-stock-illustration-male-avatar.jpg'} radius={'10px'} width={50} heigth={50} />
        </NavLink>
        {user.followed ?

          <ToggleButton followingInProgress={props.followingInProgress}
            followUnfollow={props.unFollow} userId={user.id} value='Unfollow'
          />
          :
          <ToggleButton followingInProgress={props.followingInProgress}
            followUnfollow={props.follow} userId={user.id} value='Follow'
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