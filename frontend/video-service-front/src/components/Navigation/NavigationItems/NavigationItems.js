import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';
import ListGroup from 'react-bootstrap/ListGroup';

const navigationItems = (props) => {
   

    const basicNavItems = [
        <NavigationItem link="/">Home</NavigationItem>
    ];

    const authNavItems = [
        <NavigationItem link="/profile">Profile</NavigationItem>,
        <NavigationItem link="/logout">Logout</NavigationItem>,
    ];

    const adminNavItems = [
        <NavigationItem link="/admin">Adminstration</NavigationItem>,
    ];

    let navItems = [...basicNavItems];

    if (props.isAuthenticated)
       navItems = [...navItems, ...authNavItems];

    if (props.isAuthenticated && props.userType === 'Admin')
        navItems = [...navItems, ...adminNavItems]

    return (
        <ListGroup variant="flush">
            {navItems}
        </ListGroup>
    );
};

export default navigationItems;