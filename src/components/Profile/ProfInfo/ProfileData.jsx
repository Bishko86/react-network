import React from 'react';


const ProfileData = (props) => {
  const profile = props.profile;

  return (
    <div>
      <div>
        <b> FullName:</b> {profile.fullName ? profile.fullName : 'no name'}
      </div>
      <div>
        <b> About me:</b> {profile.aboutMe ? profile.aboutMe : null}
      </div>
      <div>
        <b> Looking for a job:</b>{profile.lookingForAJob ? ' yes' : ' no'}
      </div>
      {profile.lookingForAJob &&
        <div>
          <b> My professional skills: </b>{profile.lookingForAJobDescription ? profile.lookingForAJobDescription : null}
        </div>
      }

      <div>
        <b> Contacts:</b>  <Contact contacts={profile.contacts} />
      </div>


    </div>
  )
}

const Contact = (props) => {
  let contacts = Object.entries(props.contacts);
  let trueContact = contacts.map(contact => {
    let [social, link] = contact;
    return link ? < div style={{ marginLeft: '20px' }
    } key={social} > <span><b>{social + ': '}</b></span><a href={link} target="_blank" rel="noreferrer">{link}</a></div > : null;
  });
  return (
    <>{trueContact}</>
  )
}



export default ProfileData;