import React from 'react';

import './UserName.css';

const userName = (props) => {
    const name = "Unknown";

    return (
        <div className="UserName">
            {props.name}
        </div>
    );
};

export default userName;