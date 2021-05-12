import React from 'react';
import ErrorWindow from '../../common/ErrorWindow/ErrorWindow';
import MyPosts from './MyPosts/MyPosts';
import ProfInfo from './ProfInfo/ProfInfo';

const Profile = ({ profile, setUserStatus, saveProfile, savePhoto, isOwner, status,
    deletePost, addLike, addPost, posts, closeModalError, httpError, photos }) => {


    return (
        <div>
            <ProfInfo
                setUserStatus={setUserStatus}
                saveProfile={saveProfile}
                savePhoto={savePhoto}
                profile={profile}
                isOwner={isOwner}
                status={status}
            />
            <MyPosts
                deletePost={deletePost}
                addLike={addLike}
                addPost={addPost}
                photos={photos}
                posts={posts}
            />
            {
                httpError && <ErrorWindow
                    closeModalError={closeModalError}
                    from={httpError.request}
                    error={httpError.error}
                />
            }
        </div>
    );
}
export default Profile;