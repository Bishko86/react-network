import { createSelector } from 'reselect';

export const getUserPhotos = (state) => {
  let image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVU_f47fabMc829_DSs8H4PVI-Q2TVEYehSw&usqp=CAU";
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