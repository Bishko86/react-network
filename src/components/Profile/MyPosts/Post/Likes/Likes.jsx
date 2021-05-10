import React from 'react';
import style from './Likes.module.css';

const Likes = ({ likes, liked, addLike, id }) => {

    let likedStyle = liked ? 'active' : 'like_blc';

    const toLike = () => addLike(id, likes, liked);


    return (
        <div className={style[likedStyle]} >
            <span onClick={toLike} className={style.likes}> like: {likes}</span>
        </div>
    )
}
export default Likes;