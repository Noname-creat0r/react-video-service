import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';
import ListGroup from 'react-bootstrap/ListGroup';

const navigationItems = (props) => {
    let navigationItems = (
        <ListGroup variant="flush">
            <NavigationItem link="/">Home</NavigationItem>
        </ListGroup>
    );
    
    if (props.isAuthenticated) {
        navigationItems = (
            <ListGroup variant="flush">
                <NavigationItem link="/">Home</NavigationItem>
                <NavigationItem link="/profile">Profile</NavigationItem>
            </ListGroup>
        );
    }

    return (
        {...navigationItems}
    );
};

export default navigationItems;