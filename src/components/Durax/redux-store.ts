import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import profileReducer from './ProfileReducer/profile-reducer'
import dialogReducer from './dialog-reducer'
import navbarReducer from './navbar-reducer'
import usersReducer from './UserReducer/users-reducer';
import authReducer from './auth-reducer';
import appReducer from './app-reducer';

import thunk from 'redux-thunk';

let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogPage: dialogReducer,
    navbarPage: navbarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer
});

type RootReducerType = typeof rootReducer

export type AppStateType = ReturnType<RootReducerType>


//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)
));

//@ts-ignore
window.store = store;
export default store;