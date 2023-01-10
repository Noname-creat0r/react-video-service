import React from 'react';

import Card from 'react-bootstrap/Card';

import './ProfileVideoCard.css';

const ProfileVideoCard = (props) => {
    return (
        <Card 
            className='ProfileVideoCard'
            onClick={props.clicked}>
            <Card.Img 
                variant='top'
                src={props.thumbnail}
                alt='VideoThumbnail'/>
            <Card.Body>
                <Card.Title> {props.title} </Card.Title>
            </Card.Body>
        </Card>
    );
};

export default ProfileVideoCard;