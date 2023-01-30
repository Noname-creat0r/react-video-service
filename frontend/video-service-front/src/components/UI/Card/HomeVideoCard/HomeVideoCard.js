import React from 'react';
import { NavLink } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import UserBadge from '../../User/UserBadge/UserBadge';

import './HomeVideoCard.css';

const HomeVideoCard = (props) => {
    return (
        <Card 
            className='HomeVideoCard mx-2'
            onClick={props.clicked}>
                <NavLink to={'../video'} className='link'>
                    <Card.Img 
                        variant='top'
                        src={props.thumbnail}
                        alt='VideoThumbnail'
                        width='200px'
                        height='150px'/> 
                <Card.Body>
                    <Card.Title className='title'> {props.title} </Card.Title>
                </Card.Body>
                <Card.Footer>
                    <UserBadge name={props.authorName} />
                </Card.Footer>
            </NavLink>
        </Card>
    );
};

export default HomeVideoCard;