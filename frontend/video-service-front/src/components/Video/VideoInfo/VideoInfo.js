import React from 'react';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import Image from 'react-bootstrap/Image';
import Accordion from 'react-bootstrap/Accordion';
import Placeholder from 'react-bootstrap/Placeholder';

import UserBadge from '../../UI/User/UserBadge/UserBadge';
import PlaylistIcon from '../../../assets/images/playlist.svg';
import LikeIcon from '../../../assets/images/like.svg';
import DislikeIcon from '../../../assets/images/dislike.svg';
import VideoComments from './VideoComments/VideoComments';

import './VideoInfo.css';

const VideoInfo = (props) => {
    const userInteractionStyles = { clicked: '', default: ''};
    //const isRating = props.isRating;

    return (
        <Container className='my-4'>
            <Row className='videoMainInfo'>
                <Col>
                    <h3>{props.title}</h3>
                    <UserBadge 
                        name={props.author}/> 
                </Col>
                <Col className='userInteractionSection'>
                    <Alert
                        className='userInteractionSection_container'
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
                        className='userInteractionSection_container__clicked'
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