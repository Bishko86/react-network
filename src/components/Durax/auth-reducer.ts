import { authorAPI, securityAPI } from '../../API/api'
import { Dispatch } from 'redux';

import { AuthType, LoginApiType, LogoutApiType } from '../../types/types';
import { ThunkAction } from 'redux-thunk'
import { AppStateType } from './redux-store';
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

const authReducer = (state = initState, action: ActionsType): InitStateType => {
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

type ActionsType =
    ReturnType<typeof toggleIsFetching> |
    ReturnType<typeof setAuthUserData> |
    ReturnType<typeof incorrectLoginData> |
    ReturnType<typeof setCaptchaUrl>



export const toggleIsFetching = (fetching: boolean) => (<const>{ type: TOGGLE_IS_FATCHING, fetching })

export const setAuthUserData = (
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
) => (<const>{ type: SET_USER_DATA, payload: { userId, email, login, isAuth } });


const incorrectLoginData = (isError: boolean, message: string) => (<const>{ type: IS_ERROR_REQUEST, error: { isError, message } });


const setCaptchaUrl = (url: string) => (<const>{ type: GET_CAPTCHA_URL, url });

type DispatchType = Dispatch<ActionsType>;
type ThunkType = ThunkAction<Promise<AuthType>, AppStateType, unknown, ActionsType>
export const authMeThunk = (): ThunkType => async (dispatch) => {
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

type ThunkLoginType = ThunkAction<Promise<LoginApiType>, AppStateType, unknown, ActionsType>

export const login = (login: string, password: number, rememberMe: boolean, captcha: string): ThunkLoginType => async (dispatch) => {

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

type ThunkLogoutType = ThunkAction<void, AppStateType, unknown, ActionsType>

export const logout = (): ThunkLogoutType => async (dispatch) => {
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