import React from 'react';
import style from './FormsControl.module.css'
import classNames from 'classnames/bind';
const cx = classNames.bind(style);

const FormControl = ({ typefield, input, meta, ...props }) => {
    const isError = meta.touched && meta.error;
    const className = cx({
        formControl: true,
        error: (isError) ? true : false,
    });
    return (
        <>
            { React.createElement(typefield, { className: className, ...input, ...props })}
            { isError && <span className={style.color}>{meta.error || meta.submitError}</span>}
        </ >
    )
}
export default FormControl