import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
const mapStateToProps = (state) => {
    return {
        authMe: state.auth.isAuth
    }
}
export const withAuthRedirect = (Component) => {
    class RedirectComponent extends React.Component {
        render() {
            if (!this.props.authMe) return <Redirect to='/login' />
            return <Component{...this.props} />
        }
    }
    let ConnectedAuthRedirectComponent = connect(mapStateToProps, {})(RedirectComponent);
    return ConnectedAuthRedirectComponent;
}