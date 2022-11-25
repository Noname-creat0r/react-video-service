import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className='NavigationItems'>
        <NavigationItem link="/" exact>Home</NavigationItem>
        <NavigationItem link="/" exact>Profile</NavigationItem>
        <NavigationItem link="/" exact>Settings</NavigationItem>
    </ul>
);

export default navigationItems;