import React from 'react';
import { NavLink } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import Image from 'react-bootstrap/Image';
import Accordion from 'react-bootstrap/Accordion';

import VideoComments from './VideoComments/VideoComments';
import UserBadge from '../../UI/User/UserBadge/UserBadge';

import PlaylistIcon from '../../../assets/images/playlist.svg';
import LikeIcon from '../../../assets/images/like.svg';
import DislikeIcon from '../../../assets/images/dislike.svg';
import NextIcon from '../../../assets/images/next.svg';
import PreviousIcon from '../../../assets/images/previous.svg';
import PlaylistPlay from '../../../assets/images/playlist-play.svg';

import './VideoInfo.css';

// show the shit if it is a playlist playing mode and hide otherwise
// styles and functions

const VideoInfo = (props) => {
    const playlistPanel = (
        <div className='d-flex align-items-center mx-2'>
            <Image
                className='userInteractionSection_playlistControl mx-1' 
                height='45px'
                width='45px'
                onClick={() => props.playlistSetVideo('previous')}
                src={PreviousIcon}/>
            <NavLink 
                className='text-info text-decoration-none' 
                to="/playlist">
                <Alert
                    className='mx-1 userInteractionSection_container'
                    variant='info'
                    onClick={props.showCurrentPlaylist}>
                    <Image 
                        className='mx-1 userInteractionSection_item'
                        src={PlaylistPlay}/>
                    Current playlist
                </Alert>
            </NavLink>
            <Image 
                className='userInteractionSection_playlistControl mx-1' 
                height='45px'
                width='45px'
                onClick={() => props.playlistSetVideo('next')}
                src={NextIcon}/>
        </div>);
    const items = props.interactionItems;

    return (
        <Container className='my-4'>
            <Row className='videoMainInfo'>
                <Col className=''>
                    <h3>{props.title}</h3>
                    <h4>{props.views} views</h4>
                    <UserBadge 
                        name={props.author}/> 
                </Col>
                <Col className='userInteractionSection'>
                    {props.isPlaylist ? playlistPanel : ''}                    
                    <Alert
                        onClick={() => props.addToPlaylist()}
                        className='mx-1 userInteractionSection_container'
                        variant='info'>
                        <Image 
                            className='mx-1 userInteractionSection_item'
                            src={PlaylistIcon}/>
                        Add
                    </Alert>
                    <Alert
                        onClick={() => props.rateVideoHandler('like')}
                        className='mx-2 userInteractionSection_container'
                        variant='success'>
                        <Image
                            className='mx-1 userInteractionSection_item'
                            src={LikeIcon}/>
                            {props.likes}
                    </Alert>
                    <Alert
                        onClick={() => props.rateVideoHandler('dislike')}
                        className='userInteractionSection_container'
                        variant='danger'>
                        <Image 
                           className='mx-1 userInteractionSection_item'
                           src={DislikeIcon}/>
                           {props.dislikes}
                    </Alert>
                </Col>
            </Row>
            <Row>
                <Accordion 
                    className='my-3'
                    defaultActiveKey='Description' 
                    alwaysOpen>
                    <Accordion.Item eventKey='Description'>
                        <Accordion.Header>Description</Accordion.Header>
                        <Accordion.Body>
                            {props.description}
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey='Comments'>
                        <Accordion.Header>Comments</Accordion.Header>
                        <Accordion.Body>
                           <VideoComments 
                            comments={props.comments}
                            typeCommentHandler={props.typeCommentHandler}
                            postCommentHandler={props.postCommentHandler}/>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Row>
        </Container>
    );
};

export default VideoInfo;