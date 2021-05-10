import React, { useState } from 'react';
import Preloader from '../../../common/Preloader';
import ProfileStatusWithHook from './ProfileStatusWithHooks';
import style from './ProfInfo.module.css';
import ProfileDataForm from './ProfileDataForm';
import ProfileData from './ProfileData';

const ProfInfo = ({ profile, setUserStatus, status, savePhoto, isOwner, saveProfile }) => {
    let [imageButton, setImageButton] = useState(false);
    let [editModeData, setEditModeData] = useState(false);
    let [isFetching, setIsFetching] = useState(false);
    const editCancelMode = editModeData ? 'Cancel' : 'Edit'

    if (!profile) return < Preloader from='ProfInfo' />

    const url = profile.photos.large ||
        'https://storage.jewheart.com/content/users/avatars/2920/avatar_2920_500.jpg?1558626096';

    const onMainPhotoSelect = (e) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }

    const showImageButton = (e) => {
        setTimeout(() => { setImageButton(true) }, 0)
    }

    const hideImageButton = (e) => {
        setTimeout(() => { setImageButton(false) }, 0)
    }


    return (
        <div>
            <div className={style.descripBlock}>
                <div
                    onMouseEnter={showImageButton}
                    onMouseLeave={hideImageButton}
                    className={style.test}>

                    <img src={url} alt="avatar" />

                    {
                        isOwner && imageButton ?
                            <label className={style.updateImage}>
                                <input type={'file'} onChange={onMainPhotoSelect} className={style.image_btn} /> Upload
                          </label> : null
                    }
                </div>
                <ProfileStatusWithHook
                    setUserStatus={setUserStatus}
                    isOwner={isOwner}
                    status={status}
                />
                <div>
                    {
                        isOwner &&
                        <button onClick={() => { setEditModeData(node => !node) }}>
                            {editCancelMode}
                        </button>
                    }

                    {
                        editModeData ?
                            <ProfileDataForm
                                setEditModeData={setEditModeData}
                                setIsFetching={setIsFetching}
                                contacts={profile.contacts}
                                saveProfile={saveProfile}
                                initialValues={profile}
                                isFetching={isFetching}
                            /> :
                            <ProfileData profile={profile} />
                    }
                </div>
            </div>
        </div>
    );
}



export default ProfInfo;