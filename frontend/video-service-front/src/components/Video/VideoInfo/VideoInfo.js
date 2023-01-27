import React from 'react';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import Image from 'react-bootstrap/Image';
import Accordion from 'react-bootstrap/Accordion';

import UserBadge from '../../UI/User/UserBadge/UserBadge';
import LikeIcon from '../../../assets/images/like.svg';
import DislikeIcon from '../../../assets/images/dislike.svg';
import VideoComments from './VideoComments/VideoComments';

import './VideoInfo.css';

const VideoInfo = (props) => {
    return (
        <Container className='my-4'>
            <Row className='videoMainInfo'>
                <Col>
                    <h3>{props.title}</h3>
                    <UserBadge 
                        name={props.author}/> 
                </Col>
                <Col className='videoSatisfactionRate'>
                    <Alert
                        className='mx-2'
                        variant='success'>
                        <Image
                            className='mx-1 videoSatisfactionRate_stat'
                            src={LikeIcon}/>
                            {props.likes}
                    </Alert>
                    <Alert
                        variant='danger'>
                        <Image 
                           className='mx-1 videoSatisfactionRate_stat'
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