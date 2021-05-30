import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import profileReducer from './profile-reducer'
import dialogReducer from './dialog-reducer'
import navbarReducer from './navbar-reducer'
import usersReducer from './users-reducer';
import authReducer from './auth-reducer';
import appReducer from './app-reducer.ts';

import thunk from 'redux-thunk';

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogPage: dialogReducer,
    navbarPage: navbarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)
));

window.store = store;
export default store;