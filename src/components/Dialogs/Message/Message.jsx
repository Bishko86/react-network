import React from 'react';
import AvatarUser from '../../../common/AvatarUser/AvatarUser';
import style from './Message.module.css';

const Message = (props) => {

    return (
        <div className={style[props.style]}>
            <AvatarUser
                url={props.url}
                width={40}
                height={40}
                radius={'50%'}
            />
            <p className={style.message_text}>{props.message}</p>

        </div>

    )
}
export default Message;