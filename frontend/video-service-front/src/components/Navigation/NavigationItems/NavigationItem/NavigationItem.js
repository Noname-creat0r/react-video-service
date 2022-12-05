import React from 'react';

import {NavLink} from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';

import './NavigationItem.css';

const navigationItem = (props) => (
    <ListGroup.Item className='NavigationItem'>
        <NavLink
            to={props.link}
            exact={props.exact}
            activeClassName="Active"> 
                {props.children}
        </NavLink>
    </ListGroup.Item>
);

export default navigationItem;