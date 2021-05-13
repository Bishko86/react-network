import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import { composeValidators, required, maxLengthInput } from './../../validators/validators'
import { FORM_ERROR } from 'final-form'
import FormControl from './../../../common/FormsControl/FormsControl'

const ProfileDataForm = (props) => {
  let { initialValues, setEditModeData, saveProfile, contacts } = props;

  let [isLookingJob, setIsLookingJob] = useState(false);

  const lookingJobHandler = () => {
    setIsLookingJob(value => !value);
  }
  const onSubmit = async (formData) => {
    try {
      let result = await saveProfile(formData);


      if (result.data.resultCode !== 0) {

        let error = result.data.messages[0];
        let index = error.indexOf('>') + 1;
        let index2 = error.indexOf(')');
        let key = error.slice(index, index2).toLowerCase();

        // if (result.data.resultCode !== 0) {
        // setIsFetching(false)
        // let object = { contacts: { [key]: error } }
        // let object = { [`contacts.${key}`]: error }
        // console.log(object);
        // return { object }
        return { [FORM_ERROR]: error }
        // }
      }
      setEditModeData(false)

    }
    catch { return {} }
  }

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={initialValues}
      validate={values => {
        const errors = {};
        if (!values.contacts.facebook) {
          errors.contacts = { 'facebook': 'Required' }
        }
        return errors
      }
      }
    >
      {
        ({
          submitError,
          handleSubmit,
          form,
          submitting,
          pristine,
          values
        }) => (
          <form name='profileForm' onSubmit={handleSubmit}>
            <button type="submit" disabled={submitting}> Save</button>
            {submitError && <div style={{ 'color': 'red' }}>{submitError}</div>}

            <div key={'aboutMe'}>
              <b> About me:</b> <Field validate={maxLengthInput(50)} type="text" name='aboutMe' placeholder='About me' typefield='textarea' render={FormControl} />
            </div>
            <div key={'fullName'}>
              <b> FullName:</b> <Field validate={composeValidators(required, maxLengthInput(30))} type="text" name='fullName' placeholder='fullName' typefield='input' render={FormControl} />
            </div>
            <div key={'lookingForAJob'}>
              <b> lookingForAJob:</b> <Field type="checkbox" name='lookingForAJob' placeholder='lookingForAJob' typefield='input' render={FormControl} checked={isLookingJob} onClick={lookingJobHandler} />
            </div>
            {isLookingJob &&
              <div key={'lookingForAJobDescription'}>
                <b> My professional skills:</b><Field validate={composeValidators(required, maxLengthInput(30))} type="text" name='lookingForAJobDescription' placeholder='lookingForAJobDescription' typefield='textarea' render={FormControl} />
              </div>}

            <div key={'contacts'}>
              <b> Contacts:</b> {
                Object.keys(contacts).map((contact) => {
                  return (<div key={contact}><b>{contact}</b>:
                    <Field name={`contacts.${contact}`}>
                      {({ input, meta }) => (
                        <div>
                          <input {...input} type="text" placeholder={contact} />
                          {(meta.error || meta.submitError) && meta.touched && (
                            <span>{meta.error || meta.submitError}</span>
                          )}
                        </div>
                      )}
                    </Field>
                  </div>)
                })}
            </div>

          </form>)
      }
    </Form >
  )
}

export default ProfileDataForm;