import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import { authMeThunk, logout } from './../Durax/auth-reducer';

class HeaderSmallContainer extends React.Component {

    render() {
        return <Header {...this.props} />
    }
}
const mapStateToProps = (state) => {
    return {
        login: state.auth.login,
        isAuth: state.auth.isAuth
    }
}
const HeaderContainer = connect(mapStateToProps, { authMeThunk, logout })(HeaderSmallContainer);
export default HeaderContainer;