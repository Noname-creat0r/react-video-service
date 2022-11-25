import React from 'react';

import Backdrop from '../../UI/Backdrop/Backdrop';
import Wrapper from '../../../hoc/Wrapper/Wrapper';

import './SideDrawer.css';

const sideDrawer = (props) => {
    let classes = 'SideDrawer Close';
    if (props.open){
        classes = 'SideDrawer Open';
    }

    return (
        <Wrapper>
            <Backdrop />
            <div className={classes}>
                content
            </div>
        </Wrapper>
    );
};

export default sideDrawer;