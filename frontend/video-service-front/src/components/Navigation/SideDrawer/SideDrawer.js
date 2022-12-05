import React from 'react';

import NavigationItems from '../NavigationItems/NavigationItems';
import OffCanvas from 'react-bootstrap/Offcanvas';

//import './SideDrawer.css';

const sideDrawer = (props) => (
    <OffCanvas show={props.isOpen} onHide={props.close}>
        <OffCanvas.Header>
            <OffCanvas.Title>Menu</OffCanvas.Title>
        </OffCanvas.Header>
        <OffCanvas.Body onClick={props.close}>
            <NavigationItems />
        </OffCanvas.Body>
    </OffCanvas>
);

export default sideDrawer;