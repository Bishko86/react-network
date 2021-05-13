import React from 'react';
import style from './WriteMessage.module.css';
import { required } from '../../validators/validators.js'
import { Form, Field } from 'react-final-form';
import FormControl from './../../../common/FormsControl/FormsControl';

const WriteMessage = (props) => {

    const onSubmit = (values) => {
        props.sendMessage(values.textMessage, props.userId);
        values.textMessage = '';
    }

    return (
        <div className={style.writeText}>
            <MessageForm onSubmit={onSubmit} />
        </div>

    );
}
const MessageForm = (props) => {
    return (
        <Form

            onSubmit={props.onSubmit}
            render={({ handleSubmit, submitting }) => (
                <form onSubmit={handleSubmit} name='sendMessageForm'>
                    <Field name='textMessage' validate={required} typefield='textarea' >
                        {({ input, meta }) => (
                            <div>
                                <FormControl typefield='textarea' input={input} meta={meta} />
                            </div>
                        )}
                    </Field>
                    <button disabled={submitting}>Send</button>
                </form>
            )}
        />
    )
}

export default WriteMessage;