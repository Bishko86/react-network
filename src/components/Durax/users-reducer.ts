import { updateObjectInArray } from '../../utils/object-helper';
import { usersAPI } from '../../API/api'


const UN_FOLLOW = 'USER_REDUCER_UN_FOLLOW';
const FOLLOW = 'USER_REDUCER_FOLLOW';
const SET_USERS = 'USER_REDUCER_SET_USERS';
const SET_USERS_COUNT = 'USER_REDUCER_SET_USERS_COUNT';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const TOGGLE_IS_FATCHING = 'USER_REDUCER_TOGGLE_IS_FATCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'USER_REDUCER_TOGGLE_IS_FOLLOWING_PROGRESS';
type ItemsUserType = {
    id: number
    name: string
    status: string | null
    photos: { small: string, large: string }
    followed: boolean
}
type UsersStateType = {
    items: ItemsUserType
    totalCount: number
    error: string
}

let initState = {
    users: [] as Array<UsersStateType>,
    pageSize: 5,
    allUsers: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>,
}
type InitStateType = typeof initState;
const usersReducer = (state = initState, action: any): InitStateType => {

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
type SetUserCountType = {
    type: typeof SET_USERS_COUNT
    count: number
}
export const setUserCount = (count: number) => ({ type: SET_USERS_COUNT, count })
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
    users: UsersStateType
}
export const setUsers = (users: UsersStateType): SetUsersType => ({ type: SET_USERS, users })
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
    id: number
}
export const followProgress = (progress: boolean, id: number) => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, progress, id })

// thunk functions
export const getUsersThunkCreator = (page: number, size: number) => {

    return async (dispatch: any) => {
        dispatch(toggleIsFetching(true));
        let data = await usersAPI.getUsers(page, size)
        dispatch(setUsers(data.items));
        dispatch(setUserCount(data.totalCount));
        dispatch(toggleIsFetching(false));
    }
}
//......................................................................
const followUnfollow = async (dispatch: any, request: any, followState: any, id: number) => {
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