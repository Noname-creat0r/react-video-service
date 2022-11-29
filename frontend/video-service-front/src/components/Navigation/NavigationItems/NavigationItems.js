import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className='NavigationItems'>
        <NavigationItem link="/">Home</NavigationItem>
        <NavigationItem link="/auth">Profile</NavigationItem>
        <NavigationItem link="/" >Settings</NavigationItem>
    </ul>
);

export default navigationItems;