import { authMeThunk } from './auth-reducer';
import { getUserStatus, getUserProfile } from './profile-reducer';

const SET_INITIALIZED = 'SET_INITIALIZED';
let initialState = {
    initialized: false
};

const appReducer = (state = initialState, action) => {
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
export const setInitializedSuccess = () => ({ type: SET_INITIALIZED });

export const initializedApp = () => (dispatch) => {
    return dispatch(authMeThunk()).then(() => dispatch(setInitializedSuccess()))
    // let userStatus = authMe.then((authMe) => { dispatch(getUserStatus()) })
    // let profileUser = authMe.then((authMe) => { dispatch(getUserProfile()) })
    // Promise.all([authMe]).then(() => dispatch(setInitializedSuccess()))
}
export default appReducer;