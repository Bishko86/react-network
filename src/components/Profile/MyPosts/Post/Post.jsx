import React from 'react';
import Likes from './Likes/Likes';
import style from './Post.module.css'
const Post = (props) => {
    return (
        <div className={style.block_post} >
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVU_f47fabMc829_DSs8H4PVI-Q2TVEYehSw&usqp=CAU" alt="" />
            <p>{props.message}</p>

            <Likes like={props.like} currentPost={props.currentPost} />
        </div>
    )
}
export default Post;