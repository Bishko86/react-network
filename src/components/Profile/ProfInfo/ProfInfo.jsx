import React, { useState } from 'react';
import Preloader from '../../../common/Preloader';
import ProfileStatusWithHook from './ProfileStatusWithHooks';
import style from './ProfInfo.module.css';
import ProfileDataForm from './ProfileDataForm';
import ProfileData from './ProfileData';

const ProfInfo = (props) => {
    let [imageButton, setImageButton] = useState(false);
    let [editModeData, setEditModeData] = useState(false);
    let [isFetching, setIsFetching] = useState(false);
    let editCancelMode = editModeData ? 'Cancel' : 'Edit'

    if (!props.profile) return < Preloader from='ProfInfo' />
    let url = props.profile.photos.large || 'https://storage.jewheart.com/content/users/avatars/2920/avatar_2920_500.jpg?1558626096';

    let { setUserStatus, status } = props;

    const onMainPhotoSelect = (e) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0])
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
                <div onMouseEnter={showImageButton}
                    onMouseLeave={hideImageButton}
                    className={style.test}>
                    <img
                        src={url} alt="avatar" />
                    {props.isOwner && imageButton ? <label className={style.updateImage}><input type={'file'} onChange={onMainPhotoSelect} className={style.image_btn} />Upload</label> : null}
                </div>
                <ProfileStatusWithHook setUserStatus={setUserStatus} status={status} isOwner={props.isOwner} />
                <div>
                    {props.isOwner && <button onClick={() => { setEditModeData(node => !node) }}>{editCancelMode}</button>}
                    {editModeData ? <ProfileDataForm initialValues={props.profile}
                        contacts={props.profile.contacts} isFetching={isFetching} saveProfile={props.saveProfile} setEditModeData={setEditModeData} setIsFetching={setIsFetching} /> :
                        <ProfileData profile={props.profile} />
                    }
                </div>
            </div>
        </div>
    );
}



export default ProfInfo;