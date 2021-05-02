import { profileAPI } from './../../API/api';
const ADD_LIKE = 'PROFILE_ADD_LIKE';
const ADD_POST = 'PROFILE_ADD_POST';
const DELETE_POST = 'PROFILE_DELETE_POST';
const SET_PROFILE_USER = 'PROFILE_SET_PROFILE_USER';
const GET_USER_STATUS = 'PROFILE_GET_USER_STATUS';
const SAVE_PHOTO_SUCSESS = 'SAVE_PHOTO_SUCSESS';
let initialState = {
    user: {
        // avatar: 'link',
        // name: 'Roman',
        // sureName: 'Bishko',
        // birthday: '18, 08, 1986',
        // age: 34,
        // likedPosts: new Set()
    },
    posts: [
        {
            id: 1,
            post: "Hey, how are you?",
            likes: 8,
            liked: false
        },
        {
            id: 2,
            post: "Hello, friend!",
            likes: 15,
            liked: false
        },
        {
            id: 3,
            post: "Please at this link https://www.google.com.ua/?hl=uk",
            likes: 68,
            liked: false
        }
    ],
    profile: null,
    status: ''
}
const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_STATUS:
            return {
                ...state,
                status: action.status
            }
        case ADD_LIKE:
            return {
                ...state,
                posts: state.posts.map(post => {
                    if (post.id === action.post.id) {
                        if (!action.post.liked) return {
                            ...post,
                            liked: true,
                            likes: ++action.post.likes
                        }
                        else return {
                            ...post,
                            liked: false,
                            likes: --action.post.likes
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
                    id: state.posts[state.posts.length - 1].id + 1,
                    post: action.postText,
                    likes: 0,
                    liked: false
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
                profile: { ...state.profile, ...action.profile }
            }
        case SAVE_PHOTO_SUCSESS:
            return {
                ...state,

                profile: { ...state.profile, photos: action.photos }
            }
        default:
            return state;

    }
}

export const setProfileUser = (profile) => ({ type: SET_PROFILE_USER, profile });
export const addPost = (postText) => ({ type: ADD_POST, postText });
export const deletePost = (postId) => ({ type: DELETE_POST, postId });
export const addLike = (post) => ({ type: ADD_LIKE, post });
export const setStatus = (status) => ({ type: GET_USER_STATUS, status });
export const savePhotoSucsess = (photos) => ({ type: SAVE_PHOTO_SUCSESS, photos });


export const getUserProfile = (id) => {
    return async (dispatch) => {
        try {
            let data = await profileAPI.getUser(id)
            dispatch(setProfileUser(data));
        }
        catch (err) { alert(err) }
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
        catch (err) { alert(err + 'PHOTO') }
    }
}

export const getUserStatus = (id) => async (dispatch) => {
    try {
        let response = await profileAPI.getStatus(id);
        dispatch(setStatus(response.data));
    }
    catch (err) { alert(err + 'Get Status') }
}

export const saveProfile = (profile) => async (dispatch, getState) => {
    let userId = getState().auth.userId
    let response = await profileAPI.saveProfile(profile);
    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userId))
        return response
    }
    return response
}

export const setUserStatus = (status) => {
    return async (dispatch) => {
        try {
            let response = await profileAPI.updateStatus(status)
            if (response.data.resultCode === 0) {
                dispatch(setStatus(status))
            }
        }
        catch (err) { alert(err + 'setUserStatus') }
    }
}

export default profileReducer;