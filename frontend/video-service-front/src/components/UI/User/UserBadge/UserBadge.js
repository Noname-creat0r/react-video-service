import React from 'react';

import Container from 'react-bootstrap/Container';

import UserIcon from '../UserIcon/UserIcon';
import UserName from '../UserName/UserName';

const userBadge = (props) => (
    //justify-content-lg-end
    <div className='d-flex'> 
        <UserIcon 
            icon={props.icon}/>
        <UserName
            name={props.name}/>
    </div>
);

export default userBadge;