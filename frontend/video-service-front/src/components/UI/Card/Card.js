import React from 'react';

import Card from 'react-bootstrap/Card';

const card = (props) => {
 
    return (
        <Card className='text-center'>
            <Card.Img src={props.thumbnail} alt="CardThumbnail"/>
            <Card.ImgOverlay>
                <Card.Title> {props.title} </Card.Title>
                <Card.Text> {props.views} </Card.Text>
            </Card.ImgOverlay>
        </Card>
    );
};

export default card;