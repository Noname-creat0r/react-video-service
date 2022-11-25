import React from 'react';

import SearchToggle from './SearchToggle/SearchToggle';

import './SearchInput.css';

const searchInput = (props) => (
    <div className="SearchInput d-flex">
        <input className="form-control me-2"  placeholder="Cat videos..." type="search" />
        <SearchToggle />
    </div>
);

export default searchInput;