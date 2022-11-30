import React from 'react';

import Modal from 'react-bootstrap/Modal';

const modal = (props) => (
    <Modal  
        show={props.show}
        onHide={props.hide}>
            <Modal.Header closeButton>
                <Modal.Title> 
                    {props.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body> 
                {props.children} 
            </Modal.Body>
    </Modal>
);

export default modal;