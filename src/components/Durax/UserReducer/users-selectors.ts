import { createSelector } from 'reselect';
import { AppStateType } from '../redux-store'
export const getUsers = (state: AppStateType) => {
  return state.usersPage.users
}
export const followingInProgress = (state: AppStateType) => {
  return state.usersPage.followingInProgress;
}

const getUsersReselect = createSelector(getUsers, (users) => (

  users.filter(u => true)
)
)