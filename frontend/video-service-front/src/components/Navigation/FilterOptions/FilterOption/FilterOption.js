import React from 'react';

import Form from 'react-bootstrap/Form';

import './FilterOption.css';

const FilterOption = (props) => {
    return (
        <Form.Check 
            className='FilterOption'
            key={props.label}
            label={props.label}
            type={props.type}
            checked={props.checked}
            //onChange={props.handler}
            onClick={() => props.handler(props.label, props.category)}
        />
    );
};

export default FilterOption;