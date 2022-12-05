import React from 'react';

import DrawerIcon from '../../../../assets/images/menu.svg';

import './DrawerToggle.css';

const drawerToggle = (props) => (
    <div className="DrawerToggle" onClick={props.clicked}>
        <img src={DrawerIcon} alt="Drawer" />
    </div>
);

export default drawerToggle;