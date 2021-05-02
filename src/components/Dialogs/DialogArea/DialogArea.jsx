import React from 'react';
import Message from './../Message/Message'

const DialogArea = (props) => {
    let messageElement = props.dialogPage.dialogUser[props.userId].dialog.map(message => {
        let style = message.me ? 'message' : 'unmessage';
        let avatar = message.me ? 'https://i.pinimg.com/736x/bb/5b/10/bb5b10c86dc0bb0591b113a78fc837ec.jpg' : props.dialogPage.dialogUser[props.userId].url;
        let key = message.id;

        return (
            <Message message={message.message}
                url={avatar}
                style={style}
                key={key}
            />
        )
    });

    return (
        <div>
            {messageElement}
        </div>
    )
}
export default DialogArea;