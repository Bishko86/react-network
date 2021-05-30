import { authMeThunk } from './auth-reducer';
import { getUserStatus, getUserProfile } from './profile-reducer';

const SET_INITIALIZED = 'SET_INITIALIZED';
type InitialStateType = {
    initialized: boolean
}
let initialState: InitialStateType = {
    initialized: false
};

const appReducer = (state = initialState, action: any): InitialStateType => {
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
type InitializedSuccessType = {
    type: typeof SET_INITIALIZED
}
export const setInitializedSuccess = (): InitializedSuccessType => ({ type: SET_INITIALIZED });

export const initializedApp = () => (dispatch: any) => {
    return dispatch(authMeThunk()).then(() => dispatch(setInitializedSuccess()))
    // let userStatus = authMe.then((authMe) => { dispatch(getUserStatus()) })
    // let profileUser = authMe.then((authMe) => { dispatch(getUserProfile()) })
    // Promise.all([authMe]).then(() => dispatch(setInitializedSuccess()))
}
export default appReducer;