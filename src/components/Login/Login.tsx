import React from 'react';
import LoginForm from './LoginForm';
import style from './Login.module.css';
import { AppStateType } from '../Durax/redux-store';
import { connect, ConnectedProps } from 'react-redux';
import Preloader from './../../common/Preloader';
import { Redirect } from 'react-router';
import { login, toggleIsFetching } from './../Durax/auth-reducer';

const mapStateToProps = (state: AppStateType) => {
    return {
        captchaUrl: state.auth.captchaUrl,
        authMe: state.auth.isAuth,
        error: state.auth.error,
        isFetching: state.auth.isFetching
    }
}

const connector = connect(mapStateToProps, { login, toggleIsFetching });
type PropsFromRedux = ConnectedProps<typeof connector>;

const Login: React.FC<PropsFromRedux> = (props): JSX.Element => {

    if (props.authMe) return <Redirect to={'/profile'} />
    if (props.isFetching) return <Preloader />
    return (
        <div className={style.login}>
            <h1 className={style.title}>Login</h1>
            <LoginForm
                error={props.error}
                toggleIsFetching={props.toggleIsFetching}
                captchaUrl={props.captchaUrl}
                login={props.login}
            />
        </div>
    )
}


export default connect(mapStateToProps, { login, toggleIsFetching })(Login);
