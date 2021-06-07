import { render, screen } from '@testing-library/react';
import profileReducer, { addPost, deletePost } from './profile-reducer'
let state = {
  posts: [
    {
      id: 1,
      post: "Hey, how are you?",
      likes: 8,
      liked: false
    },
    {
      id: 2,
      post: "Hello, friend!",
      likes: 15,
      liked: false
    },
    {
      id: 3,
      post: "Please at this link https://www.google.com.ua/?hl=uk",
      likes: 68,
      liked: false
    }
  ]
}
test('length posts must be bigger', () => {

  // 1 test data
  let action = addPost('hello test');


  // 2 action
  let newState = profileReducer(state, action)

  // 3 expectation
  expect(newState.posts.length).toBe(4);

});

test('check post text', () => {

  // 1 test data
  let action = addPost('hello test');


  // 2 action
  let newState = profileReducer(state, action)

  // 3 expectation
  // debugger
  expect(newState.posts[3].post).toBe('hello test');

});
test('delete post test', () => {

  // 1 test data
  let action = deletePost(1);


  // 2 action
  let newState = profileReducer(state, addPost("Roma"))
  newState = profileReducer(newState, action)

  // 3 expectation
  // debugger
  expect(newState.posts.length).toBe(3);

});