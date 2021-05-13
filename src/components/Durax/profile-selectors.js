import { createSelector } from 'reselect';

export const getUserPhotos = (state) => {
  let image = "https://sun9-4.userapi.com/impf/c622525/v622525638/4af76/FHil73y11v0.jpg?size=600x260&quality=96&proxy=1&sign=f859b538c68a2e31968ba0601eba79c5&type=album";
  if (state.profilePage.profile) return state.profilePage.profile.photos;
  return { large: image, small: image };
}

export const getErrResponse = (state) => {
  return state.profilePage.error
}

export const getPosts = (state) => {
  return state.profilePage.posts;
}

export const getProfile = (state) => {
  return state.profilePage.profile
}

export const getStatus = (state) => {
  return state.profilePage.status;
}
export const isLoggedUser = (state) => {
  return state.auth.userId
}
// const getUsersReselect = createSelector(getUsers, (users) => (

//   users.filter(u => true)
// )
// )