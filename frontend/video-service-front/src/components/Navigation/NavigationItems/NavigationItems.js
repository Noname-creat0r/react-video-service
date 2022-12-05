import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';
import ListGroup from 'react-bootstrap/ListGroup';

const navigationItems = (props) => (
    <ListGroup variant="flush">
        <NavigationItem link="/">Home</NavigationItem>
        <NavigationItem link="/profile">Profile</NavigationItem>
        <NavigationItem link="/" >Settings</NavigationItem>
    </ListGroup>
);

export default navigationItems;