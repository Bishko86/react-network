import React from 'react';
import style from './../components/Users/Users.module.css';

const ToggleButton = ({ followingInProgress, userId, value, ...props }) => {
  return (<>
    <button disabled={followingInProgress.some(id => id === userId)} onClick={() => { props.followUnfollow(userId) }}
      className={style.followBtn}>{value}</button>
  </>
  )

}

export default ToggleButton;