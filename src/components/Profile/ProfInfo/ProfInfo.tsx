import React, { useState, FC } from 'react';
import Preloader from '../../../common/Preloader';
import ProfileStatusWithHook from './ProfileStatusWithHooks';
import style from './ProfInfo.module.css';
import ProfileDataForm from './ProfileDataForm';
import ProfileData from './ProfileData';
import { ProfileType } from '../../../types/types'
type PropsType = {
    profile: ProfileType | null
    setUserStatus: (status: string) => void
    status: string
    savePhoto: (file: File) => void
    isOwner: boolean
    saveProfile: (profile: ProfileType) => void
}
interface HTMLInputEvent extends Event {
    target: HTMLInputElement;
    files: FileList | null
}
const ProfInfo: FC<PropsType> = ({ profile, setUserStatus, status, savePhoto, isOwner, saveProfile }) => {
    let [imageButton, setImageButton] = useState(false);
    let [editModeData, setEditModeData] = useState(false);
    let [isFetching, setIsFetching] = useState(false);
    const editCancelMode = editModeData ? 'Cancel' : 'Edit'

    if (!profile) return < Preloader from='ProfInfo' />

    const url = profile.photos.large

    const onMainPhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target: { files: any } = e.target
        if (target.files.length) {
            let files: File = target.files[0];
            savePhoto(files)
        }
    }

    const showImageButton = (e: React.MouseEvent<HTMLDivElement>) => {
        setTimeout(() => { setImageButton(true) }, 0)
    }

    const hideImageButton = (e: React.MouseEvent<HTMLDivElement>) => {
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
    )
}



export default ProfInfo;