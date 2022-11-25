import React from 'react';

import Backdrop from '../../UI/Backdrop/Backdrop';
import NavigationItems from '../NavigationItems/NavigationItems';

import './SideDrawer.css';

const sideDrawer = (props) => {
    let classes = 'SideDrawer Close';
    if (props.isOpen){
        classes = 'SideDrawer Open';
    }

    return (
        <div>
            <Backdrop show={props.isOpen} clicked={props.close}/>
            <div className={classes} onClick={props.close}>
                <NavigationItems />
            </div>
        </div>
    );
};

export default sideDrawer;