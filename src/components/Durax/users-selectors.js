import { createSelector } from 'reselect';
export const getUsers = (state) => {
  return state.usersPage.users
}
export const followingInProgress = (state) => {
  return state.usersPage.followingInProgress;
}

const getUsersReselect = createSelector(getUsers, (users) => (

  users.filter(u => true)
)
)