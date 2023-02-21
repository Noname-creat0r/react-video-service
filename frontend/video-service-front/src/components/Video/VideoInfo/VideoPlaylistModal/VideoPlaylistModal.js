import React from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const VideoPlaylistModal = (props) => {
    return (
        <Modal 
            size='md'
            centered
            show={props.show}
            onHide={props.hide}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Current playlist
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.videos}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.hide}></Button>
            </Modal.Footer>
        </Modal>
    );
};

export default VideoPlaylistModal;