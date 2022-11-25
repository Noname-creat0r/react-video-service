import React from 'react';

import './NavigationItem.css';

const navigationItem = (props) => (
    <li className="NavigationItem">
        {props.children}
    </li>
);

export default navigationItem;