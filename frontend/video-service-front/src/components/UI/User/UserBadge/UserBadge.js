import React from 'react';

import Container from 'react-bootstrap/Container';

import UserIcon from '../UserIcon/UserIcon';
import UserName from '../UserName/UserName';

const userBadge = (props) => (
    <Container className='d-flex justify-content-lg-end'> 
        <UserIcon 
            icon={props.icon}/>
        <UserName 
            name={props.name}/>
    </Container>
);

export default userBadge;