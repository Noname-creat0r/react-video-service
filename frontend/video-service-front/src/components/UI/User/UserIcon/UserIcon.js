import React from 'react';

import DefaultUserIcon from "../../../../assets/images/default-user-icon.svg";
import Image from 'react-bootstrap/Image';

import './UserIcon.css';

const userIcon = (props) => (
    <div className="UserIcon">
        <Image 
            src={props.avatarId ? process.env.REACT_APP_BASE_SERVER_URL + '/image/avatar?id=' + props.avatarId 
                : DefaultUserIcon} 
            alt="userIcon" />
    </div>
);

export default userIcon;