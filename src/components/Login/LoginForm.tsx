import React, { useRef, useState } from 'react';
import { InitStateErrorType } from '../Durax/auth-reducer';
import { composeValidators, required, maxLengthInput } from '../validators/validators';
import FormControl from '../../common/FormsControl/FormsControl';
import { Form, Field } from 'react-final-form';
import { BsEye, BsEyeSlash } from "react-icons/bs";
import style from './Login.module.css';
import { LoginApiType } from './../../types/types';

type PropsOwn = {
    captchaUrl: string | null
    error: InitStateErrorType
    toggleIsFetching: (fetching: boolean) => { readonly type: "auth_reducer_TOGGLE_IS_FATCHING"; readonly fetching: boolean; }
    login: (login: string, password: string, rememberMe: boolean, captcha: string) => Promise<LoginApiType>
}

type PropsType = PropsOwn;

const LoginForm: React.FC<PropsType> = ({ captchaUrl, error, toggleIsFetching, ...props }): JSX.Element => {
    let { isError, message } = error;
    const inputEl = useRef<HTMLInputElement>(null);
    let [showHidePass, setShowHidePass] = useState(true);
    const showPassword = () => {
        if (inputEl && inputEl.current) {
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
    }

    return (
        <div className={style.form_login}>
            <Form
                onSubmit={async (formData) => {
                    console.log(formData);
                    toggleIsFetching(true);
                    let { login, password, rememberMe, captcha } = formData;
                    await props.login(login, password, rememberMe, captcha)
                    toggleIsFetching(false)
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
                )}
            </Form >
        </div >
    )
}

export default LoginForm;