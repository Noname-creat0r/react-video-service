import React from 'react';

import Container from 'react-bootstrap/Container';
import Toast from 'react-bootstrap/Toast';
import UserBadge from '../../../UI/User/UserBadge/UserBadge';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './VideoComments.css'

const VideoComments = (props) => {
    // 1. controls
    // 2. comments gradinet collor 
    return (
        <Container>
            <Form onSubmit={props.postCommentHandler}>
                <Form.Group>
                    <Form.Label>Any comments?</Form.Label>
                    <Form.Control 
                        as='textarea' 
                        rows={3} 
                        onChange={props.typeCommentHandler}/>
                </Form.Group>
                <Button 
                    type='submit'
                    className='my-2'
                    variant='outline-primary'>
                        Post
                </Button>
            </Form>
            <hr />
            
            <div className='my-3 py-2 text-black' style={{background: 'radial-gradient(circle, rgba(180,136,170,1) 2%, rgba(255,255,255,1) 100%, rgba(135,91,125,1) 100%)', borderRadius: '20px' }}>
                <UserBadge name="nameawdawda"/>
                <p className='mx-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, atque. Vitae sapiente numquam nisi ducimus. Aspernatur dolore tempore architecto nesciunt explicabo, sapiente placeat ducimus, eligendi nobis sed eum molestias ratione.</p>
                <i className='mx-3'>11 mins ago </i>
            </div>
            <div className='my-3'>
                <UserBadge name="name"/>
                <p className='mx-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, atque. Vitae sapiente numquam nisi ducimus. Aspernatur dolore tempore architecto nesciunt explicabo, sapiente placeat ducimus, eligendi nobis sed eum molestias ratione.</p>
                <i className='mx-3'>11 mins ago </i>
            </div>
        </Container>
    );
};

export default VideoComments;