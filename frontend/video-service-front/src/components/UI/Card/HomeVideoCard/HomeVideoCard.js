import React from 'react';
import { NavLink } from 'react-router-dom';

import Card from 'react-bootstrap/Card';

import './HomeVideoCard.css';

const HomeVideoCard = (props) => {
    return (
        <Card 
            className='HomeVideoCard mx-2'
            onClick={props.clicked}>
                <NavLink to={'../video'} className='link'>
                    <Card.Img 
                        className='my-2'
                        variant='top'
                        src={props.thumbnail}
                        alt='VideoThumbnail'
                        width='200px'
                        height='150px'/> 
                <Card.Body>
                    <Card.Title className='title'> {props.title} </Card.Title>
                </Card.Body>
                <Card.Footer>
                    UserBadge
                </Card.Footer>
            </NavLink>
        </Card>
    );
};

export default HomeVideoCard;