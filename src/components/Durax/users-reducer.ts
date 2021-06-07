import { updateObjectInArray, updateArrayIfCondition } from '../../utils/object-helper';
import { usersAPI } from '../../API/api'
import { ItemsUserType } from './../../types/types'
import { ThunkAction } from 'redux-thunk';
import { AppStateType } from './redux-store';
import { Dispatch } from 'redux';

const UN_FOLLOW = 'USER_REDUCER_UN_FOLLOW';
const FOLLOW = 'USER_REDUCER_FOLLOW';
const SET_USERS = 'USER_REDUCER_SET_USERS';
const SET_USERS_COUNT = 'USER_REDUCER_SET_USERS_COUNT';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const TOGGLE_IS_FATCHING = 'USER_REDUCER_TOGGLE_IS_FATCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'USER_REDUCER_TOGGLE_IS_FOLLOWING_PROGRESS';



let initState = {
    users: [] as Array<ItemsUserType>,
    pageSize: 5,
    allUsers: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>,
}
type InitStateType = typeof initState;
const usersReducer = (state = initState, action: ActionsTypes): InitStateType => {

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
                followingInProgress: updateArrayIfCondition(action.progress, action.id, state.followingInProgress)

            }

        default:
            return state;
    }
}
// actions creators
type ActionsTypes = SetUserCountType | UnFollowSuccessType | SetUsersType | ToggleIsFetchingType | FollowProgressType | FollowSuccessType | SetCurrentPageType

type SetUserCountType = {
    type: typeof SET_USERS_COUNT
    count: number
}
export const setUserCount = (count: number): SetUserCountType => ({ type: SET_USERS_COUNT, count })

type UnFollowSuccessType = {
    type: typeof UN_FOLLOW
    id: number
}
export const unFollowSuccess = (id: number): UnFollowSuccessType => ({ type: UN_FOLLOW, id })

type FollowSuccessType = {
    type: typeof FOLLOW
    id: number
}
export const followSuccess = (id: number): FollowSuccessType => ({ type: FOLLOW, id })

type SetUsersType = {
    type: typeof SET_USERS
    users: Array<ItemsUserType>
}
export const setUsers = (users: Array<ItemsUserType>): SetUsersType => ({ type: SET_USERS, users })

export type SetCurrentPageType = {
    type: typeof SET_CURRENT_PAGE
    page: number
}
export const setCurrentPage = (page: number): SetCurrentPageType => ({ type: SET_CURRENT_PAGE, page })

export type ToggleIsFetchingType = {
    type: typeof TOGGLE_IS_FATCHING
    fetching: boolean
}
export const toggleIsFetching = (fetching: boolean): ToggleIsFetchingType => ({ type: TOGGLE_IS_FATCHING, fetching })
type FollowProgressType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    progress: boolean
    id: number
}
export const followProgress = (progress: boolean, id: number): FollowProgressType => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, progress, id })

// thunk functions
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsTypes>
export const getUsersThunkCreator = (page: number, size: number): ThunkType => {

    return async (dispatch) => {
        dispatch(toggleIsFetching(true));
        let data = await usersAPI.getUsers(page, size)
        dispatch(setUsers(data.items));
        dispatch(setUserCount(data.totalCount));
        dispatch(toggleIsFetching(false));
    }
}
//......................................................................
const followUnfollow = async (dispatch: Dispatch<ActionsTypes>, request: any, followState: any, id: number) => {
    dispatch(followProgress(true, id));
    let data = await request(id)
    if (data.resultCode === 0) {
        dispatch(followState(id));
        dispatch(followProgress(false, id));
    }
}

export const unFollow = (id: number) => {
    const unFollow = usersAPI.unFollow;
    return (dispatch: any) => {
        followUnfollow(dispatch, unFollow, unFollowSuccess, id)
    }
}

export const follow = (id: number) => {
    const follow = usersAPI.follow;
    return (dispatch: any) => {
        followUnfollow(dispatch, follow, followSuccess, id)
    }
}

export default usersReducer;