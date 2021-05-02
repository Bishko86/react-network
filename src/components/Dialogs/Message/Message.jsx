import React from 'react';
import AvatarUser from '../AvatarUser/AvatarUser';
import style from './Message.module.css';


const Message = (props) => {
    if (props.message.length <= 2) {
        console.log(props.message.length);

        new Error('I fell')
    }
    return (

        <div className={style[props.style]}>
            <AvatarUser url={props.url} />
            {props.message}

        </div>

    )
}
export default Message;