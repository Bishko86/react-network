import { ProfileType, PhotosType } from '../../../types/types';
import * as Action from './profile-actions';


export const setProfileUser = (profile: ProfileType) => (<const>{ type: Action.SET_PROFILE_USER, profile });


export const addPost = (postText: string) => (<const>{ type: Action.ADD_POST, postText });


export const deletePost = (postId: number) => (<const>{ type: Action.DELETE_POST, postId });


export const addLike = (id: number, likes: number, liked: boolean) => (<const>{ type: Action.ADD_LIKE, id, likes, liked });


export const setStatus = (status: string) => (<const>{ type: Action.GET_USER_STATUS, status });


export const savePhotoSucsess = (photos: PhotosType) => (<const>{ type: Action.SAVE_PHOTO_SUCSESS, photos });


export const closeModalError = () => (<const>{ type: Action.CLOSE_ERROR_MODAL_WINDOW });


export const setErrorData = (error: {}, request: string | null) => (<const>{ type: Action.SET_ERROR_DATA, payload: { error, request } });

