import React, { memo } from 'react';
import style from './MyPosts.module.css';
import Post from './Post/Post';
import { Form, Field } from 'react-final-form';
import FormControl from '../../../common/FormsControl/FormsControl';
import { composeValidators, required, maxLengthInput } from '../../validators/validators'

const MyPosts = React.memo((props) => {
    let onSubmit = (formData) => {
        props.addPost(formData.posText)
        formData.posText = ''
    }
    return (

        <div className={style.blockPost}>

            <h4>My posts</h4>

            <div className={style.post_area}>
                <PostForm onSubmit={onSubmit} />
            </div>
            <div className={style.post}>
                {props.posts.map((post) => <Post message={post.post} currentPost={post} like={props.addLike} key={post.id} />)}
            </div>
        </div >
    )
});
const PostForm = (props) => {

    return (
        <Form
            onSubmit={props.onSubmit}
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