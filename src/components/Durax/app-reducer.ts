import { authMeThunk } from './auth-reducer';
import { getUserStatus, getUserProfile } from './ProfileReducer/profile-reducer';
import { AuthType, inferLiteralFromString } from './../../types/types';
import { ThunkAction } from 'redux-thunk'
import { AppStateType } from './redux-store';


const SET_INITIALIZED = 'SET_INITIALIZED';
type InitialStateType = {
    initialized: boolean
}
let initialState: InitialStateType = {
    initialized: false
};

const appReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case SET_INITIALIZED:
            return {
                ...state,
                initialized: true
            }
        default:
            return state
    }

}

type ActionTypes = ReturnType<typeof setInitializedSuccess>;
export const setInitializedSuccess = () => ({ type: inferLiteralFromString(SET_INITIALIZED) });
type InitialithedThunkType = ThunkAction<Promise<AuthType>, AppStateType, unknown, ActionTypes>
export const initializedApp = () => async (dispatch: any) => {

    const data = await dispatch(authMeThunk());
    dispatch(setInitializedSuccess());
    // let userStatus = authMe.then((authMe) => { dispatch(getUserStatus()) })
    // let profileUser = authMe.then((authMe) => { dispatch(getUserProfile()) })
    // Promise.all([authMe]).then(() => dispatch(setInitializedSuccess()))
    return data;
}
export default appReducer;