import { authorAPI, securityAPI } from './../../API/api'

const SET_USER_DATA = 'auth_reducer_SET_USER_DATA';
const IS_ERROR_REQUEST = 'auth_reducer_IS_ERROR_REQUEST';
const TOGGLE_IS_FATCHING = 'auth_reducer_TOGGLE_IS_FATCHING';
const GET_CAPTCHA_URL = 'auth_reducer_GET_CAPTCHA_URL';

let initState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    isFetching: false,
    error: {
        isError: false,
        message: ''
    },
    captchaUrl: null
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            }
        case IS_ERROR_REQUEST:
            return {
                ...state,
                error: action.error
            }
        case TOGGLE_IS_FATCHING:
            return {
                ...state,
                isFetching: !state.isFetching
            }
        case GET_CAPTCHA_URL:
            return {
                ...state,
                captchaUrl: action.url
            }
        default:
            return state
    }
}
export const toggleIsFetching = (fetching) => ({ type: TOGGLE_IS_FATCHING, fetching })
export const setAuthUserData = (userId, email, login, isAuth) => ({ type: SET_USER_DATA, payload: { userId, email, login, isAuth } });

const incorrectLoginData = (isError, message) => ({ type: IS_ERROR_REQUEST, error: { isError, message } });
const setCaptchaUrl = (url) => ({ type: GET_CAPTCHA_URL, url });



export const authMeThunk = () => (dispatch) => {
    return authorAPI.authMe().then(data => {
        if (data.resultCode === 0) {
            let { id, email, login } = data.data;
            dispatch(setAuthUserData(id, email, login, true));
            return data.data
        }
    }).catch(response => alert(response + 'from authMe'));
}


export const login = (login, password, rememberMe, captcha) => (dispatch) => {
    return authorAPI.login(login, password, rememberMe, captcha).then(response => {
        if (response.data.resultCode === 0) {
            dispatch(incorrectLoginData(false, ''));
            dispatch(authMeThunk())
        }
        else {
            if (response.data.resultCode === 10) {
                dispatch(getCaptchaUrl());
            }
            dispatch(incorrectLoginData(true, response.data.messages[0]));
        }
    })
}
export const logout = () => (dispatch) => {
    authorAPI.logout().then(response => {
        if (response.data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false))
        }
    })
}
export const getCaptchaUrl = () => async (dispatch) => {
    const response = await securityAPI.getCaptchaUrl()
    const capthaUrl = response.data.url;
    dispatch(setCaptchaUrl(capthaUrl))
}

export default authReducer;