import React from 'react';

import Backdrop from '../../UI/Backdrop/Backdrop';

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
                <div>
                    SideDrawer
                </div>
            </div>
        </div>
    );
};

export default sideDrawer;