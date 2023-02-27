import React from 'react';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import {NavLink} from 'react-router-dom';

import './PlaylistControls.css';

const PlaylistControls = (props) => {
    return (
        <Container className='d-flex justify-content-center my-3'>
            <NavLink 
                className='text-info text-decoration-none' 
                to="/video" 
                onClick={props.playlistOn}>
                <Button 
                    size='lg'
                    className='mx-2 my-2'
                    variant='outline-info'
                    disabled={props.currentVideoId}
                    onClick={props.playlistOn}>
                        Play
                </Button>
            </NavLink>
            <Button 
                size='lg'
                className='mx-2 my-2'
                variant='outline-info'
                onClick={props.playlistEdit}>
                Edit
            </Button>
            <Button 
                size='lg'
                className='mx-2 my-2'
                variant='outline-info'
                onClick={props.playlistOff}>
                Stop
            </Button>
        </Container>
    );
};

export default PlaylistControls;