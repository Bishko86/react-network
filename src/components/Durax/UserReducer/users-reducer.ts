import { updateObjectInArray, updateArrayIfCondition } from '../../../utils/object-helper';
import { usersAPI } from './../../../API/api';
import { ItemsUserType } from '../../../types/types';
import { ThunkAction } from 'redux-thunk';
import { AppStateType } from '../redux-store';
import { Dispatch } from 'redux';
import * as  Action from './user-actions';
import * as actions from './user-action-creator';

type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;
type ActionTypes = ReturnType<InferValueTypes<typeof actions>>

let initState = {
    users: [] as Array<ItemsUserType>,
    pageSize: 5,
    allUsers: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>,
}
type InitStateType = typeof initState;

const usersReducer = (state = initState, action: ActionTypes): InitStateType => {

    switch (action.type) {

        case Action.FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, 'id', action.id, { followed: true })

            }

        case Action.UN_FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, 'id', action.id, { followed: false })
            }

        case Action.SET_USERS:
            return {
                ...state,
                users: [...action.users, ...state.users]
            }

        case Action.SET_USERS_COUNT:
            return {
                ...state,
                allUsers: action.count
            }

        case Action.SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.page
            }

        case Action.TOGGLE_IS_FATCHING:
            return {
                ...state,
                isFetching: action.fetching
            }

        case Action.TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: updateArrayIfCondition(action.progress, action.id, state.followingInProgress)

            }

        default:
            return state;
    }
}

type ThunkType = ThunkAction<void, AppStateType, unknown, ActionTypes>

// thunk function- get users data from remote server

export const getUsersThunkCreator = (page: number, size: number): ThunkType =>
    async (dispatch) => {
        dispatch(actions.toggleIsFetching(true));
        let data = await usersAPI.getUsers(page, size)
        dispatch(actions.setUsers(data.items));
        dispatch(actions.setUserCount(data.totalCount));
        dispatch(actions.toggleIsFetching(false));
    }

// dispatch universal function 
const followUnfollow = async (dispatch: Dispatch<ActionTypes>, request: any, followState: any, id: number) => {
    dispatch(actions.followProgress(true, id));
    let data = await request(id)
    if (data.resultCode === 0) {
        dispatch(followState(id));
        dispatch(actions.followProgress(false, id));
    }
}

//thunk function - unFollow user 
export const unFollow = (id: number): ThunkType => {
    const unFollow = usersAPI.unFollow;
    return (dispatch: Dispatch<ActionTypes>) => {
        followUnfollow(dispatch, unFollow, actions.unFollowSuccess, id)
    }
}

//thunk function - follow user 
export const follow = (id: number): ThunkType => {
    const follow = usersAPI.follow;
    return (dispatch: Dispatch<ActionTypes>) => {
        followUnfollow(dispatch, follow, actions.followSuccess, id)
    }
}

export default usersReducer;