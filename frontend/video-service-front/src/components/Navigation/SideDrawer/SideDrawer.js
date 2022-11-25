import React from 'react';

import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';

import './SideDrawer.css';

const sideDrawer = (props) => {
    let classes = 'SideDrawer Close';
    if (props.open){
        classes = 'SideDrawer Open';
    }

    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.clicked}/>
            <div className={classes}>
                content
            </div>
        </Aux>
    );
};

export default sideDrawer;