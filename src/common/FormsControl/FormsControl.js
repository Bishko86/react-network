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
        <div className={className}>
            { React.createElement(typefield, { ...input, ...props })}
            { isError && <span className={style.color}>{meta.error || meta.submitError}</span>}
        </div >
    )
}
export default FormControl