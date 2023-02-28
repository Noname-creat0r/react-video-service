import React from 'react';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import {NavLink} from 'react-router-dom';

import './PlaylistControls.css';

const PlaylistControls = (props) => {
    return (
        <Container className='d-flex justify-content-center my-3'>
            <Button 
                size='lg'
                className='mx-2 my-2'
                variant='outline-info'
                disabled={props.videosLength === 0}
                onClick={props.playlistOn}>
                <NavLink 
                    className='text-info text-decoration-none' 
                    to="/video" 
                    onClick={props.playlistOn}>
                    Play
                </NavLink>
            </Button>
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