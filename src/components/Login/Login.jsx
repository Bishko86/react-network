import React from 'react';
import style from './Login.module.css';
import LoginForm from './LoginForm';

const Login = (props) => {
    return (
        <div>
            <h1 className={style.title}>Login</h1>
            <LoginForm />
        </div>
    )
}

export default Login;