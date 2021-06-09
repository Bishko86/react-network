import * as Action from './user-actions';
import { ItemsUserType } from './../../../types/types'


export const setCurrentPage = (page: number) => (<const>{ type: Action.SET_CURRENT_PAGE, page });

export const toggleIsFetching = (fetching: boolean) => (<const>{ type: Action.TOGGLE_IS_FATCHING, fetching });

export const followProgress = (progress: boolean, id: number) => (<const>{ type: Action.TOGGLE_IS_FOLLOWING_PROGRESS, progress, id });

export const setUsers = (users: Array<ItemsUserType>) => (<const>{ type: Action.SET_USERS, users });

export const followSuccess = (id: number) => (<const>{ type: Action.FOLLOW, id });

export const unFollowSuccess = (id: number) => (<const>{ type: Action.UN_FOLLOW, id });

export const setUserCount = (count: number) => (<const>{ type: Action.SET_USERS_COUNT, count });

