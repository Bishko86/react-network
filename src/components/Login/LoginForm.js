import React, { useRef, useState } from 'react';
import { login } from '../Durax/auth-reducer';
import { connect } from 'react-redux';
import { composeValidators, required, maxLengthInput } from '../validators/validators'
import FormControl from '../../common/FormsControl/FormsControl';
import { Form, Field } from 'react-final-form';
import { Redirect } from 'react-router';
import { toggleIsFetching } from '../Durax/auth-reducer'
import Preloader from '../../common/Preloader';
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { classNames } from 'classnames/bind';

const LoginForm = ({ style, ...props }) => {
    const inputEl = useRef();
    let [showHidePass, setShowHidePass] = useState(true);
    if (props.authMe) return <Redirect to={'/profile'} />
    let { isFetching, toggleIsFetching, captchaUrl } = props
    if (isFetching) return <Preloader />

    let { isError, message } = props.error;

    const showPassword = () => {
        let password = inputEl.current;
        if (password.type === 'password') {
            password.type = 'text';
            setShowHidePass(false);
        }
        else {
            password.type = 'password';
            setShowHidePass(true);
        }
    }

    return (
        <div className={style.form_login}>
            <Form

                onSubmit={formData => {
                    toggleIsFetching();
                    let { login, password, rememberMe, captcha } = formData;
                    props.login(login, password, rememberMe, captcha).then(() => toggleIsFetching())

                }}>
                {({ handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <div style={{ position: 'relative', display: 'inline' }}>
                            <Field validate={composeValidators(required, maxLengthInput(30))} type="text" name='login' placeholder='Login' typefield='input' render={FormControl} />
                        </div>
                        <div style={{ position: 'relative', display: 'inline' }}>
                            <Field validate={composeValidators(required, maxLengthInput(30))} type="password" name='password' placeholder='Password' typefield='input' render={FormControl} ref={inputEl} />
                            {
                                showHidePass ?
                                    <BsEye onClick={showPassword} className={style.show_hide_el} /> :
                                    <BsEyeSlash className={style.show_hide_el} onClick={showPassword} />
                            }
                        </div>

                        <div className={style.checkbox}>
                            <label htmlFor={'checkbox'}>
                                Remember me:
                            </label>
                            <Field type='checkbox' name='rememberMe' typefield='input' render={FormControl} id={'checkbox'} />
                        </div>
                        {captchaUrl &&
                            <div className={style.captcha}>
                                <div>
                                    <img src={captchaUrl} alt='captcha' />
                                </div>
                                <div style={{ textAlign: 'center', position: 'relative', display: 'inline' }}>
                                    <Field validate={required} type="text" name='captcha' placeholder='Enter symbols' typefield='input' autocomplete="off" render={FormControl} />
                                </div>
                            </div>
                        }
                        <div>
                            {isError && <p className={style.submit_error}>{message}</p>}
                            <button >Login</button>
                        </div>
                    </form>

                )
                }

            </Form >
        </div >
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

