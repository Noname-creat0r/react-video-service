import React from 'react';
import { NavLink } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import DeleteButton from 'react-bootstrap/CloseButton';

import './ProfilePlaylistCard.css';

const ProfilePlaylistCard = (props) => {
    return (
        <Card 
            className='ProfilePlaylistCard mx-2 my-2'
            onClick={props.clicked}>
            <NavLink to={'/playlist'} className='link'>
                <Card.Img 
                    variant='top'
                    src={props.thumbnail}
                    alt='PlaylistThumbnail'
                    width='200px'
                    height='150px'/> 
                <Card.Body>
                    <Card.Title className='title'> {props.title} </Card.Title>
                </Card.Body>
            </NavLink>
            <Card.Footer className='d-flex justify-content-between'> 
                {props.videoNumber} videos
                <DeleteButton onClick={props.delete}/>
            </Card.Footer>
        </Card>
    );
};

export default ProfilePlaylistCard;