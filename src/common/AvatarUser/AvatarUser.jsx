import React from 'react';

const AvatarUser = ({ radius, width, height, url, }) => {
    return (
        <>
            <img style={{ width: width, height: height, borderRadius: radius }} src={url} alt="userphoto" />
        </>
    );
}
export default AvatarUser;