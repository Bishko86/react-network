import { authorAPI, securityAPI } from '../../API/api'

const SET_USER_DATA = 'auth_reducer_SET_USER_DATA';
const IS_ERROR_REQUEST = 'auth_reducer_IS_ERROR_REQUEST';
const TOGGLE_IS_FATCHING = 'auth_reducer_TOGGLE_IS_FATCHING';
const GET_CAPTCHA_URL = 'auth_reducer_GET_CAPTCHA_URL';
type InitStateErrorType = {
    isError: boolean
    message: string
}
type InitStateType = {
    userId: number | null
    email: string | null
    login: string | null
    captchaUrl: string | null
    isAuth: boolean
    isFetching: boolean
    error: InitStateErrorType
}

let initState: InitStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    isFetching: false,
    captchaUrl: null,
    error: {
        isError: false,
        message: ''
    },
}

const authReducer = (state = initState, action: any): InitStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
                sdd: 234
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
type ToggleIsFetchingType = {
    type: typeof TOGGLE_IS_FATCHING
    fetching: boolean
}
export const toggleIsFetching = (fetching: boolean): ToggleIsFetchingType => ({ type: TOGGLE_IS_FATCHING, fetching })
type AuthUserDataPayloadType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}
type AuthUserDataType = {
    type: typeof SET_USER_DATA
    payload: AuthUserDataPayloadType
}
export const setAuthUserData = (
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
): AuthUserDataType => ({ type: SET_USER_DATA, payload: { userId, email, login, isAuth } });

type IncorrectLoginDataType = {
    type: typeof IS_ERROR_REQUEST
    error: InitStateErrorType
}
const incorrectLoginData = (isError: boolean, message: string)
    : IncorrectLoginDataType => ({ type: IS_ERROR_REQUEST, error: { isError, message } });

type CaptchaUrlType = {
    type: typeof GET_CAPTCHA_URL
    url: string
}
const setCaptchaUrl = (url: string) => ({ type: GET_CAPTCHA_URL, url });



export const authMeThunk = () => async (dispatch: any) => {
    try {
        const data = await authorAPI.authMe()

        if (data.resultCode === 0) {
            let { id, email, login } = data.data;
            dispatch(setAuthUserData(id, email, login, true));
            return data.data
        }
        return data
    }
    catch (err) { alert(err + 'from authMe') };
}


export const login = (login: string, password: number, rememberMe: boolean, captcha: string) => async (dispatch: any) => {

    const response = await authorAPI.login(login, password, rememberMe, captcha)

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
    return response;
}

export const logout = () => async (dispatch: any) => {
    const response = await authorAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}

export const getCaptchaUrl = () => async (dispatch: any) => {
    const response = await securityAPI.getCaptchaUrl()
    const capthaUrl = response.data.url;
    dispatch(setCaptchaUrl(capthaUrl))
}

export default authReducer;