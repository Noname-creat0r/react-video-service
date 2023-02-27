import React from 'react';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import {NavLink} from 'react-router-dom';

const PlaylistControls = (props) => {
    return (
        <Container className='d-flex justify-content-center my-3'>
            <Button 
                size='lg'
                className='mx-2 my-2'
                variant='outline-info'
                onClick={props.playlistOn}>
                <NavLink to="/video" onClick={props.playlistOn}>
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
        </Container>
    );
};

export default PlaylistControls;