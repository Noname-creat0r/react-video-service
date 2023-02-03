import React from 'react';
import { NavLink } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import ListGroup from 'react-bootstrap/ListGroup';
import UserBadge from '../../User/UserBadge/UserBadge';
import ActionsIcon from '../../../../assets/images/menu-kebab.svg';

import './HomeVideoCard.css';

const HomeVideoCard = (props) => {
    const popover = (
        <Popover id='options-popover'>
            <Popover.Header as='h3'>Options</Popover.Header>
            <Popover.Body>
                <ListGroup>
                    <ListGroup.Item action onClick={() => alert('bitch')}>Add to playlist</ListGroup.Item>
                </ListGroup>
            </Popover.Body>
        </Popover>
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
                <OverlayTrigger 
                    trigger="click"
                    placement="top-start"
                    overlay={popover}>
                    <Image 
                        src={ActionsIcon} 
                        className='OptionsIcon align-self-center'
                        width='20px'
                        height='20px'/> 
                </OverlayTrigger>
            </Card.Footer>
        </Card>
    );
};

export default HomeVideoCard;