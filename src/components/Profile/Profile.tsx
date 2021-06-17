import React, { FC } from 'react';
import ErrorWindow from '../../common/ErrorWindow/ErrorWindow';
import MyPosts from './MyPosts/MyPosts';
import ProfInfo from './ProfInfo/ProfInfo';
import { PostType, ProfileType } from '../../types/types';
import { PhotosType } from './../../types/types';

type PrimitivePropsType = {
    setUserStatus: (status: string) => void
    deletePost: (postId: number) => void
    saveProfile: (profile: ProfileType) => void
    savePhoto: (file: any) => void
    addLike: (id: number, likes: number, liked: boolean) => void
    addPost: (postText: string) => void
    closeModalError: () => void
    profile: ProfileType | null
    posts: Array<PostType>
    httpError: any
    photos: PhotosType
    isOwner: boolean
    status: string
}
type Props = PrimitivePropsType

const Profile: Function = ({ profile, setUserStatus, saveProfile, savePhoto, isOwner, status,
    deletePost, addLike, addPost, posts, closeModalError, httpError, photos }: Props): JSX.Element => {


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