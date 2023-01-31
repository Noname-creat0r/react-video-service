import React from 'react';
import { NavLink } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';

import './ProfileVideoCard.css';

const ProfileVideoCard = (props) => {
    return (
        <Card 
            className='ProfileVideoCard mx-2 my-2'
            onClick={props.clicked}>
                <NavLink to={'../video'} className='link'>
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
                    <Card.Title className='title'> {props.title} </Card.Title>
                </Card.Body>
            </NavLink>
        </Card>
    );
};

export default ProfileVideoCard;