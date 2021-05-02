import React from 'react';
import { login } from '../Durax/auth-reducer';
import { connect } from 'react-redux';
import { composeValidators, required, maxLengthInput } from '../validators/validators'
import FormControl from '../../common/FormsControl/FormsControl';
import { Form, Field } from 'react-final-form';
import { Redirect } from 'react-router';
import { toggleIsFetching } from '../Durax/auth-reducer'
import Preloader from '../../common/Preloader';

const LoginForm = (props) => {
    if (props.authMe) return <Redirect to={'/profile'} />
    let { isFetching, toggleIsFetching, captchaUrl } = props
    if (isFetching) return <Preloader />
    let { isError, message } = props.error

    return (

        <Form
            onSubmit={formData => {
                toggleIsFetching();
                let { login, password, rememberMe, captcha } = formData;
                props.login(login, password, rememberMe, captcha).then(() => toggleIsFetching())

            }}>
            {({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <div>
                        <Field validate={composeValidators(required, maxLengthInput(30))} type="text" name='login' placeholder='Login' typefield='input' render={FormControl} />

                    </div>
                    <div>
                        <Field validate={composeValidators(required, maxLengthInput(30))} type="password" name='password' placeholder='Password' typefield='input' render={FormControl} />
                        <div>
                            <Field type='checkbox' name='rememberMe' typefield='input' render={FormControl} /> remember me
                        </div>
                    </div>
                    {captchaUrl && <img src={captchaUrl} alt='captcha' />}

                    {captchaUrl && <Field validate={composeValidators(required, maxLengthInput(30))} type="text" name='captcha' placeholder='Enter sumbols' typefield='input' render={FormControl} />}
                    <div>
                        <button>Login</button>
                        {isError && <span>{message}</span>}
                    </div>
                </form>

            )}

        </Form>

    )
}
const mapStateToProps = (state) => {
    return {
        captchaUrl: state.auth.captchaUrl,
        authMe: state.auth.isAuth,
        error: state.auth.error,
        isFetching: state.auth.isFetching
    }
}

export default connect(mapStateToProps, { login, toggleIsFetching })(LoginForm);

