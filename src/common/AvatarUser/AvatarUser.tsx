import React, { FC } from 'react';

type PropsType = {
    width: number
    height: number
    radius: string
    url: string
}

const AvatarUser: FC<PropsType> = ({ radius, width, height, url, }): JSX.Element => {
    return (
        <>
            <img style={{ width: width, height: height, borderRadius: radius }} src={url} alt="userphoto" />
        </>
    );
}
export default AvatarUser;