import React from 'react';

import ToggleButton from 'react-bootstrap/ToggleButton';

import './FilterOption.css';

const FilterOption = (props) => {
    return (
        <ToggleButton
            className='FilterOption'
            variant='outline-info'
            id={props.label}
            key={props.label}
            disabled={props.disabled}
            value={[props.category, props.label]}>
            {props.label}
        </ToggleButton>
    );
};

export default FilterOption;