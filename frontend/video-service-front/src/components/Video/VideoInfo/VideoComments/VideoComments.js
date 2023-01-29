import React from 'react';

import Container from 'react-bootstrap/Container';
import Toast from 'react-bootstrap/Toast';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import VideoComment from './VideoComment/VideoComment';

import './VideoComments.css'

const VideoComments = (props) => {
    // 1. controls
    // 2. comments gradinet collor 
    const comments = props.comments.map(comment => 
        <VideoComment 
            authorName={comment.authorName}
            text={comment.text}
            createdAt={comment.createdAt}/>
        );
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
            {comments.length !== 0 ? comments : <em>No comments yet...</em>}
        </Container>
    );
};

export default VideoComments;