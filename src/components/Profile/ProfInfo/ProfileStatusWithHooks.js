import React, { useEffect, useState } from 'react';
import style from './ProfInfo.module.css';
const ProfileStatusWithHook = (props) => {

  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState(props.status);

  const editStatus = (value) => {
    if (props.isOwner) {
      setEditMode(value)
    }
  }

  const onChange = (e) => {
    setStatus(e.currentTarget.value);
  }

  const saveStatus = () => {
    editStatus(false);
    props.setUserStatus(status);
  }

  useEffect(() => { setStatus(props.status) }, [props.status]);

  return (
    <>
      {!editMode &&
        (<div onDoubleClick={() => editStatus(true)} className={style.status}>
          <span >{props.status}</span>
        </div>)
      }
      {editMode &&
        (< div >
          <input autoFocus={true} onBlur={saveStatus} type="text" onChange={onChange} value={status} />
        </div>)
      }
    </>

  )

}
export default ProfileStatusWithHook;