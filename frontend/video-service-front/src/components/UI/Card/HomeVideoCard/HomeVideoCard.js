import React from 'react';
import { NavLink } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import ListGroup from 'react-bootstrap/ListGroup';

import Overlay from '../../Overlay/Overlay';
import UserBadge from '../../User/UserBadge/UserBadge';
import ActionsIcon from '../../../../assets/images/menu-kebab.svg';

import './HomeVideoCard.css';

const HomeVideoCard = (props) => {
    const options = (
        <ListGroup.Item 
            action 
            onClick={props.addToPlaylist}>
                Add to playlist
        </ListGroup.Item>
    );

    const menuIcon = (
        <Image 
            src={ActionsIcon} 
            className='OptionsIcon align-self-center'
            width='20px'
            height='20px'/> 
    );

    return (
        <Card 
            className='HomeVideoCard mx-2 my-2'
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
            </NavLink>
            <Card.Footer className='d-flex'>
                <UserBadge name={props.authorName} />
                <Overlay
                    trigger='click'
                    placement='top-start'
                    header='Options'
                    content={options}
                    container={menuIcon}
                    />
            </Card.Footer>
        </Card>
    );
};

export default HomeVideoCard;