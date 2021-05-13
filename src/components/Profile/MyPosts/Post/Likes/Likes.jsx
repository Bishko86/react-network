import React from 'react';
import style from './Likes.module.css';
import { FiThumbsUp } from "react-icons/fi";
const Likes = ({ likes, liked, addLike, id }) => {

    let likedStyle = liked ? 'active' : 'like_blc';

    const toLike = () => addLike(id, likes, liked);


    return (
        <div className={style[likedStyle]} >
            <span onClick={toLike} className={style.likes}> <FiThumbsUp size={18} /> {likes}</span>
        </div>
    )
}
export default Likes;