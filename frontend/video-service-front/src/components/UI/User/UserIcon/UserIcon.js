import React from 'react';

import DefaultUserIcon from "../../../../assets/images/default-user-icon.svg";

import './UserIcon.css';

const userIcon = (props) => (
    <div className="UserIcon">
        <img src={props.icon ? props.icon : DefaultUserIcon} alt="userIcon" />
    </div>
);

export default userIcon;