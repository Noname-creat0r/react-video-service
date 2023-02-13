import React from 'react';

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import ListGroup from 'react-bootstrap/ListGroup';

const Overlay = (props) => {

    const popover = (
        <Popover id='options-popover' >
            <Popover.Header as='h3'>{props.header}</Popover.Header>
            <Popover.Body>
                <ListGroup>
                    {props.content}
                </ListGroup>
            </Popover.Body>
        </Popover>
    );

    return (
        <OverlayTrigger 
            trigger={props.trigger}
            placement={props.placement}
            overlay={popover}>
            {props.container}
        </OverlayTrigger>
    );
};

export default Overlay;