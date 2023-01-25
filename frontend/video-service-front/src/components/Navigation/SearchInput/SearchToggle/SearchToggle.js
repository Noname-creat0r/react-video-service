import React from 'react';

import SearchIcon from '../../../../assets/images/search.svg';

import './SearchToggle.css';

const searchToggle = (props) => {
    return (
        <div className="SearchToggle">
            <img src={SearchIcon} 
                alt="SearchIcon"
 />
        </div>
    );
};

export default searchToggle;