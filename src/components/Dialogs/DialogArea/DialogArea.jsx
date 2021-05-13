import React from 'react';
import Message from './../Message/Message'

const DialogArea = ({ photos, dialogPage, userId }) => {

    const user_photo = dialogPage.dialogUser[userId].url;
    const dialog = dialogPage.dialogUser[userId].dialog;

    const messageElement = dialog.map((message) => {

        const style = message.me ? 'my_message' : 'user_message';
        const avatar = message.me ? photos.small : user_photo;
        const key = message.id;

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