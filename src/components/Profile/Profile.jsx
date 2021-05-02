import React from 'react';
import MyPosts from './MyPosts/MyPosts';
import ProfInfo from './ProfInfo/ProfInfo';

const Profile = (props) => {

    return (
        <div>

            <ProfInfo profile={props.profile} setUserStatus={props.setUserStatus} status={props.status} isOwner={props.isOwner} savePhoto={props.savePhoto} saveProfile={props.saveProfile} />

            <MyPosts addLike={props.addLike}
                addPost={props.addPost}
                posts={props.posts}
            />
        </div>
    );
}
export default Profile;