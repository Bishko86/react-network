import React from 'react';
import style from './FormsControl.module.css'
const FormControl = ({ typefield, input, meta, ...props }) => {

    // meta.touched && meta.error;
    const isError = meta.touched && meta.error;
    // (meta.error || meta.submitFailed) && meta.touched;
    // meta.touched && meta.error;
    // const errorSubmit = meta.submitError;
    // isError && console.log(props.name + meta);
    return (
        <div className={style.formControl + ' ' + (isError ? style.error : '')}>
            { React.createElement(typefield,
                { ...input, ...props }
            )
            }

            { isError && <span className={style.color}>{meta.error || meta.submitError}</span>}

        </div >

    )
}
export default FormControl