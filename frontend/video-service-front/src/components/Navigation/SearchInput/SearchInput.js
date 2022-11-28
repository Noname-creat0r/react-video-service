import React from 'react';

import Form from 'react-bootstrap/Form';
import SearchToggle from './SearchToggle/SearchToggle';

import './SearchInput.css';

const searchInput = (props) => (
    <div className="SearchInput d-flex">
        <Form.Control placeholder='Cat videos...' type="search" />
        <SearchToggle />
    </div>
);

export default searchInput;