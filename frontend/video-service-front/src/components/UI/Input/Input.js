import React from 'react';

import Form from 'react-bootstrap/Form';

const input = (props) => {
    const classes = props.classes;
    const properties = {};
    let inputElement = null;

    if (props.touched || props.isValid ) {
        properties['isValid'] = true;
    } 
    // For avatars - change for other files !
    if (props.type === 'file') {
        properties['accept'] = 'image/*';
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <Form.Control 
                className={classes}
                name={props.name}
                value={props.value}
                onChange={props.changeHandler}
                onClick={props.clickHandler}
                placeholder={props.elementConfig.placeholder}
                type={props.elementConfig.type}
                {...properties}
                />;
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