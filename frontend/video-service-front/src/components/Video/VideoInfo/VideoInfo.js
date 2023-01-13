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

import './VideoInfo.css';

const VideoInfo = (props) => {
    return (
        <Container className='my-4'>
            <Row className='videoMainInfo'>
                <Col>
                    <h3>Video title</h3>
                    <UserBadge 
                        name="CoolDude"/> 
                </Col>
                <Col className='videoSatisfactionRate'>
                    <Alert
                        className='mx-2'
                        variant='success'>
                        <Image
                            className='mx-1 videoSatisfactionRate_stat'
                            src={LikeIcon}/>
                            1k
                    </Alert>
                    <Alert
                        variant='danger'>
                        <Image 
                           className='mx-1 videoSatisfactionRate_stat'
                           src={DislikeIcon}/>
                           23
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
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis laboriosam quod facilis nobis explicabo illo illum rem magni nemo eligendi nisi totam fuga porro, nulla obcaecati ut, excepturi officia a!
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey='Comments'>
                        <Accordion.Header>Comments</Accordion.Header>
                        <Accordion.Body>
                            Comments...
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Row>
        </Container>
    );
};

export default VideoInfo;