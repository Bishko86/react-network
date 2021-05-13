import React from 'react';
import style from './Dialogs.module.css';
import DialogUser from './DialogUser/DialogUser';
import DialogArea from './DialogArea/DialogArea';
import WriteMessage from './WriteMessage/WriteMessage';

const Dialogs = (props) => {
    let dialogsElement = props.dialogPage.dialogUser.map((elem, index) => <DialogUser id={index + 1} name={elem.name} url={elem.url} key={index + 1} dialog={elem.dialog} />
    );

    let userId = props.match.params.userId - 1;

    return (
        <div className={style.dialogs}>
            <div className={style.dialog_user_block}>
                {dialogsElement}
            </div>
            {props.match.params.userId &&
                <div className={style.messageBlock}>
                    <div className={style.messageArea}>
                        <DialogArea userId={userId} dialogPage={props.dialogPage} photos={props.photos} />
                    </div>
                    <div className={style.textArea}>
                        <WriteMessage sendMessage={props.sendMessage} userId={userId} />

                    </div>
                </div>}
        </div>
    );
}
export default Dialogs;
