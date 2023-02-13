import React from 'react';

import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';

const PlaylistItem = (props) => {
    console.log (props.thumbnail);
    return (
        <Container className='d-flex'>
            <Image 
                src={'http://localhost:8080/video/thumbnail?id=' + props.thumbnail}
                width={'1rem'}
                height={'1rem'}/>
            {props.title}
        </Container>
    );
};

export default PlaylistItem;