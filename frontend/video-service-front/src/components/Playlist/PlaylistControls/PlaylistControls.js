import React from 'react';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

const PlaylistControls = () => {
    return (
        <Container className='d-flex justify-content-center my-3'>
            <Button size='lg' className='mx-2 my-2' variant='info'>Play</Button>
            <Button size='lg' className='mx-2 my-2' variant='info'>Delete</Button>
        </Container>
    );
};

export default PlaylistControls;