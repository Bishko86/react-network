import { profileAPI } from '../../API/api';

const ADD_LIKE = 'Profile_Reducer_PROFILE_ADD_LIKE';
const ADD_POST = 'Profile_Reducer_PROFILE_ADD_POST';
const DELETE_POST = 'Profile_Reducer_PROFILE_DELETE_POST';
const SET_PROFILE_USER = 'Profile_Reducer_PROFILE_SET_PROFILE_USER';
const GET_USER_STATUS = 'Profile_Reducer_PROFILE_GET_USER_STATUS';
const SAVE_PHOTO_SUCSESS = 'Profile_Reducer_SAVE_PHOTO_SUCSESS';
const SET_ERROR_DATA = 'Profile_Reducer_SET_ERROR_DATA';
const CLOSE_ERROR_MODAL_WINDOW = 'Profile_Reducer_CLOSE_ERROR_MODAL_WINDOW';
type PhotoType = {
    small: string | null
    large: string | null
}
type ContactsType = {
    github: string | null
    vk: string | null
    facebook: string | null
    instagram: string | null
    twitter: string | null
    website: string | null
    youtube: string | null
    mainLink: string | null
}
type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string | null
    fullName: string
    contacts: ContactsType
    photos: PhotoType

}
type PostType = {
    id: number
    post: string
    likes: number
    liked: boolean
    date: Date | string
}
type InitialStateType = {
    posts: Array<PostType>
    profile: ProfileType | null
    status: string
    error: boolean
}
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

const profileReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case GET_USER_STATUS:
            return {
                ...state,
                status: action.status,
            }
        case ADD_LIKE:
            return {
                ...state,
                posts: state.posts.map(post => {
                    if (post.id === action.id) {
                        if (!action.liked) return {
                            ...post,
                            liked: true,
                            likes: ++action.likes
                        }
                        else return {
                            ...post,
                            liked: false,
                            likes: --action.likes
                        }
                    }
                    else return post
                })
            }

        case ADD_POST:
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
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postId)
            }
        case SET_PROFILE_USER:
            return {
                ...state,
                profile: { ...state.profile, ...action.profile },
            }
        case SAVE_PHOTO_SUCSESS:
            return {
                ...state,

                profile: { ...state.profile, photos: action.photos } as ProfileType,
                error: false
            }
        case SET_ERROR_DATA:
            return {
                ...state,
                error: action.payload
            }
        case CLOSE_ERROR_MODAL_WINDOW:
            return {
                ...state,
                error: false
            }
        default:
            return state;

    }
}

type ProfileUserType = {
    type: typeof SET_PROFILE_USER
    profile: ProfileType
}
export const setProfileUser = (profile: ProfileType): ProfileUserType => ({ type: SET_PROFILE_USER, profile });

type AddPostType = {
    type: typeof ADD_POST
    postText: string
}
export const addPost = (postText: string): AddPostType => ({ type: ADD_POST, postText });
type DeletePostType = {
    type: typeof DELETE_POST
    postId: number
}
export const deletePost = (postId: number): DeletePostType => ({ type: DELETE_POST, postId });

type AddLikeType = {
    type: typeof ADD_LIKE
    id: number
    likes: number
    liked: boolean
}
export const addLike = (id: number, likes: number, liked: boolean): AddLikeType => ({ type: ADD_LIKE, id, likes, liked });

type SetStatusType = {
    type: typeof GET_USER_STATUS
    status: string
}
export const setStatus = (status: string): SetStatusType => ({ type: GET_USER_STATUS, status });

type SavePhotoSuccessType = {
    type: typeof SAVE_PHOTO_SUCSESS
    photos: PhotoType
}
export const savePhotoSucsess = (photos: PhotoType): SavePhotoSuccessType => ({ type: SAVE_PHOTO_SUCSESS, photos });
type CloseModalErrorType = {
    type: typeof CLOSE_ERROR_MODAL_WINDOW
}
export const closeModalError = (): CloseModalErrorType => ({ type: CLOSE_ERROR_MODAL_WINDOW });

type SetErrorDataType = {
    type: typeof SET_ERROR_DATA
    payload: { error: {}, request: string | null }
}
const setErrorData = (error: {}, request: string | null): SetErrorDataType => ({ type: SET_ERROR_DATA, payload: { error, request } });

export const getUserProfile = (id: number) => {
    return async (dispatch: any) => {
        try {
            let data = await profileAPI.getUser(id)
            dispatch(setProfileUser(data));
        }
        catch (err) { dispatch(setErrorData(err, 'User Profile')) }
    }
}

export const savePhoto = (file: any) => {
    return async (dispatch: any) => {
        try {
            let response = await profileAPI.savePhoto(file)
            if (response.data.resultCode === 0) {
                dispatch(savePhotoSucsess(response.data.data.photos));
            }
        }
        catch (err) { dispatch(setErrorData(err, null)) }
    }
}

export const getUserStatus = (id: number) => async (dispatch: any) => {
    try {
        let response = await profileAPI.getStatus(id);
        dispatch(setStatus(response.data));
    }
    catch (err) { dispatch(setErrorData(err, 'User Status')) }
}

export const saveProfile = (profile: {}) => async (dispatch: any, getState: any) => {
    try {
        let userId = getState().auth.userId
        let response = await profileAPI.saveProfile(profile);
        if (response.data.resultCode === 0) {
            dispatch(getUserProfile(userId))
            return response
        }
        return response
    }
    catch (err) { dispatch(setErrorData(err, null)) }
}

export const setUserStatus = (status: string) => {
    return async (dispatch: any) => {
        try {
            let response = await profileAPI.updateStatus(status)
            if (response.data.resultCode === 0) {
                dispatch(setStatus(status))
            }
        }
        catch (err) { dispatch(setErrorData(err, null)) }
    }
}

export default profileReducer;