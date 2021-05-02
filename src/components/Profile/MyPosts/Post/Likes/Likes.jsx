import React from 'react';
import style from './Likes.module.css';
const Likes = (props) => {
    // debugger
    let likedStyle = props.currentPost.liked ? 'active' : 'like_blc';

    function like() {
        props.like(props.currentPost);
    }

    return (
        <div className={style[likedStyle]} onClick={like}>
            like: {props.currentPost.likes}
        </div>
    )
}
export default Likes;