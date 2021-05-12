import React from 'react';
import Likes from './Likes/Likes';
import style from './Post.module.css'
const Post = ({ photos, message, addLike, liked, id, likes, date, deletePost }) => {

    return (
        <div className={style.block_post} >
            <img src={photos.small} alt="User avatar" />
            <div style={{ width: '75%' }}>
                <p className={style.post_text}>{message}</p>

                <Likes
                    addLike={addLike}
                    liked={liked}
                    id={id}
                    likes={likes}
                />
            </div>
            <span>{date}</span>
            <span onClick={() => deletePost(id)} className={style.delete_post}>X</span>
        </div>
    )
}
export default Post;