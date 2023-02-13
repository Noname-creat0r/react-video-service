import React from 'react';

import Form from 'react-bootstrap/Form';
import { updateObject } from '../../../shared/utility';

const input = (props) => {
    const classes = props.classes;
    let properties = {};
    let inputElement = null;

    if (props.touched || props.isValid ) {
        properties['isValid'] = true;
    } 

    properties = updateObject(properties, {
        className: classes,
        name: props.name,
        onChange: props.changeHandler,
        onClick: props.clickHandler,
        placeholder: props.elementConfig.placeholder,
        type: props.elementConfig.type,
    })

    switch (props.elementConfig.type) {
        case ('file'):
            inputElement = <Form.Control 
                {...properties}
                title={props.value.name}
                />;
            break;
        default:
            inputElement = <Form.Control 
                value={props.value}
                {...properties}/>;
            break;
    }

    return (
        <div className='my-3'>
            <Form.Label>{props.label}</Form.Label>
            {inputElement}
            <Form.Text className='muted'>{props.tip}</Form.Text>
        </div>
    );
};

export default input;