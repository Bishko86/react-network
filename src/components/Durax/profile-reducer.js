import { profileAPI } from './../../API/api';

const ADD_LIKE = 'Profile_Reducer_PROFILE_ADD_LIKE';
const ADD_POST = 'Profile_Reducer_PROFILE_ADD_POST';
const DELETE_POST = 'Profile_Reducer_PROFILE_DELETE_POST';
const SET_PROFILE_USER = 'Profile_Reducer_PROFILE_SET_PROFILE_USER';
const GET_USER_STATUS = 'Profile_Reducer_PROFILE_GET_USER_STATUS';
const SAVE_PHOTO_SUCSESS = 'Profile_Reducer_SAVE_PHOTO_SUCSESS';
const SET_ERROR_DATA = 'Profile_Reducer_SET_ERROR_DATA';
const CLOSE_ERROR_MODAL_WINDOW = 'Profile_Reducer_CLOSE_ERROR_MODAL_WINDOW';
let initialState = {

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
const profileReducer = (state = initialState, action) => {
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

                profile: { ...state.profile, photos: action.photos },
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

export const setProfileUser = (profile) => ({ type: SET_PROFILE_USER, profile });
export const addPost = (postText) => ({ type: ADD_POST, postText });
export const deletePost = (postId) => ({ type: DELETE_POST, postId });
export const addLike = (id, likes, liked) => ({ type: ADD_LIKE, id, likes, liked });
export const setStatus = (status) => ({ type: GET_USER_STATUS, status });
export const savePhotoSucsess = (photos) => ({ type: SAVE_PHOTO_SUCSESS, photos });
export const closeModalError = () => ({ type: CLOSE_ERROR_MODAL_WINDOW });
const setErrorData = (error, request) => ({ type: SET_ERROR_DATA, payload: { error, request } });

export const getUserProfile = (id) => {
    return async (dispatch) => {
        try {
            let data = await profileAPI.getUser(id)
            dispatch(setProfileUser(data));
        }
        catch (err) { dispatch(setErrorData(err, 'User Profile')) }
    }
}

export const savePhoto = (file) => {
    return async (dispatch) => {
        try {
            let response = await profileAPI.savePhoto(file)
            if (response.data.resultCode === 0) {
                dispatch(savePhotoSucsess(response.data.data.photos));
            }
        }
        catch (err) { dispatch(setErrorData(err)) }
    }
}

export const getUserStatus = (id) => async (dispatch) => {
    try {
        let response = await profileAPI.getStatus(id);
        dispatch(setStatus(response.data));
    }
    catch (err) { dispatch(setErrorData(err, 'User Status')) }
}

export const saveProfile = (profile) => async (dispatch, getState) => {
    try {
        let userId = getState().auth.userId
        let response = await profileAPI.saveProfile(profile);
        if (response.data.resultCode === 0) {
            dispatch(getUserProfile(userId))
            return response
        }
        return response
    }
    catch (err) { dispatch(setErrorData(err)) }
}

export const setUserStatus = (status) => {
    return async (dispatch) => {
        try {
            let response = await profileAPI.updateStatus(status)
            if (response.data.resultCode === 0) {
                dispatch(setStatus(status))
            }
        }
        catch (err) { dispatch(setErrorData(err)) }
    }
}

export default profileReducer;