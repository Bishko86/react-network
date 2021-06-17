import { profileAPI } from './../../../API/api';
import { ThunkAction } from 'redux-thunk';
import { AppStateType } from '../redux-store';
import * as actions from './profile-action-creators';
import * as Action from './profile-actions';
import { InitialStateType, ProfileType } from '../../../types/types'



type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;
type ActionTypes = ReturnType<InferValueTypes<typeof actions>>


let initialState: InitialStateType = {

    posts: [
        {
            id: 1,
            post: "Hey, how are you?",
            likes: 8,
            liked: false,
            date: '18.08.2020'
        },
        {
            id: 2,
            post: "Hello, friend!",
            likes: 15,
            liked: false,
            date: '18.08.2020'

        },
        {
            id: 3,
            post: "Please at this link https://www.google.com.ua/?hl=uk",
            likes: 68,
            liked: false,
            date: '28.08.2020'

        }
    ],
    profile: null,
    status: '',
    error: false
}

const profileReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case Action.GET_USER_STATUS:
            return {
                ...state,
                status: action.status,
            }
        case Action.ADD_LIKE:
            return {
                ...state,
                posts: state.posts.map(post => {
                    if (post.id === action.id) {
                        if (!action.liked) return {
                            ...post,
                            liked: true,
                            likes: action.likes + 1
                        }
                        else return {
                            ...post,
                            liked: false,
                            likes: action.likes - 1
                        }
                    }
                    else return post
                })
            }

        case Action.ADD_POST:
            if (action.postText === '') return state;
            return {
                ...state,
                posts: [...state.posts,
                {
                    id: state.posts.length > 0 ?
                        state.posts[state.posts.length - 1].id + 1 : 1,
                    post: action.postText,
                    likes: 0,
                    liked: false,
                    date: new Date().toLocaleDateString()
                }
                ]
            }
        case Action.DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postId)
            }
        case Action.SET_PROFILE_USER:
            return {
                ...state,
                profile: { ...state.profile, ...action.profile },
            }
        case Action.SAVE_PHOTO_SUCSESS:
            return {
                ...state,

                profile: { ...state.profile, photos: action.photos } as ProfileType,
                error: false
            }
        case Action.SET_ERROR_DATA:
            return {
                ...state,
                error: action.payload
            }
        case Action.CLOSE_ERROR_MODAL_WINDOW:
            return {
                ...state,
                error: false
            }
        default:
            return state;

    }
}



type GetUserProfileThunkType = ThunkAction<void, AppStateType, unknown, ActionTypes>

export const getUserProfile = (id: number | null) => {
    return async (dispatch: any) => {
        try {
            let data = await profileAPI.getUser(id)
            dispatch(actions.setProfileUser(data));

        }
        catch (err) { dispatch(actions.setErrorData(err, 'User Profile')) }
    }
}

export const savePhoto = (file: any): GetUserProfileThunkType => {
    return async (dispatch) => {
        try {
            let response = await profileAPI.savePhoto(file)
            if (response.data.resultCode === 0) {
                dispatch(actions.savePhotoSucsess(response.data.data.photos));
            }
        }
        catch (err) { dispatch(actions.setErrorData(err, null)) }
    }
}

export const getUserStatus = (id: number | null): GetUserProfileThunkType => async (dispatch) => {
    try {
        let response = await profileAPI.getStatus(id);
        dispatch(actions.setStatus(response.data));
    }
    catch (err) { dispatch(actions.setErrorData(err, 'User Status')) }
}

export const saveProfile = (profile: ProfileType): GetUserProfileThunkType => async (dispatch, getState) => {
    try {
        let userId = getState().auth.userId
        let response = await profileAPI.saveProfile(profile);
        if (response.data.resultCode === 0) {
            dispatch(getUserProfile(userId))
            return response
        }
        return response
    }
    catch (err) { dispatch(actions.setErrorData(err, null)) }
}

export const setUserStatus = (status: string): GetUserProfileThunkType => {
    return async (dispatch) => {
        try {
            let response = await profileAPI.updateStatus(status)
            if (response.data.resultCode === 0) {
                dispatch(actions.setStatus(status))
            }
        }
        catch (err) { dispatch(actions.setErrorData(err, null)) }
    }
}

export default profileReducer;