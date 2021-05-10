import React from 'react';
import style from './ErrorWindow.module.css'

const ErrorWindow = ({ error, from, closeModalError }) => {

  return (
    <div className={style.modal}>
      <div className={style.modalContent}>
        From: {from}
        <p className={style.errorMessage}>{error.message}</p>
        <button onClick={closeModalError} className={style.close}>Ok</button>
      </div>
    </div>
  )
}

export default ErrorWindow;