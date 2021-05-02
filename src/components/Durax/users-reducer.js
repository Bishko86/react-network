import { updateObjectInArray } from '../../utils/object-helper';
import { usersAPI } from './../../API/api'

const UN_FOLLOW = 'USER_REDUCER_UN_FOLLOW';
const FOLLOW = 'USER_REDUCER_FOLLOW';
const SET_USERS = 'USER_REDUCER_SET_USERS';
const SET_USERS_COUNT = 'USER_REDUCER_SET_USERS_COUNT';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const TOGGLE_IS_FATCHING = 'USER_REDUCER_TOGGLE_IS_FATCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'USER_REDUCER_TOGGLE_IS_FOLLOWING_PROGRESS';


let initState = {
    users: [],
    pageSize: 5,
    allUsers: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [],
}

const usersReducer = (state = initState, action) => {

    switch (action.type) {

        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, 'id', action.id, { followed: true })

            }

        case UN_FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, 'id', action.id, { followed: false })
            }

        case SET_USERS:
            return {
                ...state,
                users: [...action.users, ...state.users]
            }

        case SET_USERS_COUNT:
            return {
                ...state,
                allUsers: action.count
            }

        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.page
            }

        case TOGGLE_IS_FATCHING:
            return {
                ...state,
                isFetching: action.fetching
            }

        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.progress ?
                    [...state.followingInProgress, action.id] :
                    state.followingInProgress.filter(id => id !== action.id)
            }

        default:
            return state;
    }
}
// actions creators
export const setUserCount = (count) => ({ type: SET_USERS_COUNT, count })
export const unFollowSuccess = (id) => ({ type: UN_FOLLOW, id })
export const followSuccess = (id) => ({ type: FOLLOW, id })
export const setUsers = (users) => ({ type: SET_USERS, users })
export const setCurrentPage = (page) => ({ type: SET_CURRENT_PAGE, page })
export const toggleIsFetching = (fetching) => ({ type: TOGGLE_IS_FATCHING, fetching })
export const followProgress = (progress, id) => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, progress, id })

// thunk functions
export const getUsersThunkCreator = (page, size) => {

    return async (dispatch) => {
        dispatch(toggleIsFetching(true));
        let data = await usersAPI.getUsers(page, size)
        dispatch(setUsers(data.items));
        dispatch(setUserCount(data.totalCount));
        dispatch(toggleIsFetching(false));
    }
}
//......................................................................
const followUnfollow = async (dispatch, request, followState, id) => {
    dispatch(followProgress(true, id));
    let data = await request(id)
    if (data.resultCode === 0) {
        dispatch(followState(id));
        dispatch(followProgress(false, id));
    }
}

export const unFollow = (id) => {
    const unFollow = usersAPI.unFollow;
    return (dispatch) => {
        followUnfollow(dispatch, unFollow, unFollowSuccess, id)
    }
}

export const follow = (id) => {
    const follow = usersAPI.follow;
    return (dispatch) => {
        followUnfollow(dispatch, follow, followSuccess, id)
    }
}

export default usersReducer;