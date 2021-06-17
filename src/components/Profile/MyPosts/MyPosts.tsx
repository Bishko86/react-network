import React, { FC } from 'react';
import style from './MyPosts.module.css';
import Post from './Post/Post';
import { Form, Field } from 'react-final-form';
import FormControl from '../../../common/FormsControl/FormsControl';
import { composeValidators, required, maxLengthInput } from '../../validators/validators'
import { PostType } from '../../../types/types';
import { PhotosType } from '../../Durax/ProfileReducer/profile-selectors';
type PropsType = {
    addPost: (postText: string) => void
    photos: PhotosType
    deletePost: (postId: number) => void
    addLike: (id: number, likes: number, liked: boolean) => void
    posts: Array<PostType>
}
type OnSubmitType = {
    onSubmit: (formData: {
        posText: string;
    }) => void
}
const MyPosts: FC<PropsType> = React.memo(({ photos, addPost, deletePost, addLike, posts }): JSX.Element => {
    let onSubmit = (formData: { posText: string },) => {
        addPost(formData.posText)
        formData.posText = ''

    }
    return (
        <div className={style.blockPost}>

            <h4>My posts</h4>

            <div className={style.post_area}>
                <PostForm onSubmit={onSubmit} />
            </div>
            <div className={style.post}>
                {
                    posts.map((post) => <Post
                        deletePost={deletePost}
                        photos={photos}
                        addLike={addLike}
                        message={post.post}
                        liked={post.liked}
                        likes={post.likes}
                        date={post.date}
                        key={post.id}
                        id={post.id}
                    />)
                }
            </div>
        </div >
    )
});
const PostForm: FC<OnSubmitType> = ({ onSubmit }): JSX.Element => {
    console.log(onSubmit);

    return (
        <Form
            onSubmit={onSubmit}
            render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit} >
                    <Field name='posText' validate={composeValidators(required, maxLengthInput(15))} typefield='textarea' component={FormControl} />
                    <button>Add post</button>
                </form>
            )}
        />
    )
}

export default MyPosts;