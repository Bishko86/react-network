import React from 'react';
import renderer from 'react-test-renderer';
import { create } from "react-test-renderer";
import { NavLink } from 'react-router-dom';
import User from './User';
import AvatarUser from '../Dialogs/AvatarUser/AvatarUser';
import style from './Users.module.css';
import ToggleButton from './../../common/ToggleButton';
import { BrowserRouter } from 'react-router-dom';
const props = {
  user: {
    name: "Juls2201",
    id: 16690,
    uniqueUrlName: null,
    photos: {
      small: null,
      large: null
    },
    status: null,
    followed: false
  },
  followingInProgress: [],
  unFollow() { this.user.followed = false },
  follow() { props.user.followed = true }
}


// describe('Test of User Component', () => {
//   test('Testing follow / unfollow button', () => {
//     const component = renderer.create(<User  {...props} />);
//     let tree = component.toJSON();
//     expect(tree).toMatchSnapshot();

//     const instance = component.root;
//     const button = instance.findByType("button");
//     button.props.onClick()
//     tree = component.toJSON();
//     expect(tree).toMatchSnapshot();

//   });
// }
// )