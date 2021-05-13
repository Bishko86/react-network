import React from 'react';
import Likes from './Likes/Likes';
import { FiXCircle } from "react-icons/fi";
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
            <span className={style.date}>{date}</span>
            <span onClick={() => deletePost(id)} className={style.delete_post}><FiXCircle size={16} color={'#5e5e5b'} /></span>
        </div>
    )
}
export default Post;