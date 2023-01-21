import React from 'react';

import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import './ProfileVideoCard.css';

const ProfileVideoCard = (props) => {
    return (
        <Card 
            className='ProfileVideoCard mx-2'
            onClick={props.clicked}>
            {
                props.thumbnail ? 
                    <Card.Img 
                        variant='top'
                        src={props.thumbnail}
                        alt='VideoThumbnail'
                        width='200px'
                        height='150px'/> :
                    <Spinner className='Image mx-3 my-2' style={{ width: '5rem', height: '5rem'}}/>
            }
            <Card.Body>
                <Card.Title> {props.title} </Card.Title>
            </Card.Body>
        </Card>
    );
};

export default ProfileVideoCard;