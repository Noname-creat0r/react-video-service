import React from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import './SignUp.css';

const signUp = (props) => (
    <Form >
        <Form.Group controlId="formName">
            <Form.Label>Nickname:</Form.Label>
            <Form.Control type="text" placeholder="Enter your nickname" />
            <Form.Text className="text-muted">
                Your nickname should consist of english characters and 
                numbers only with length about 8 - 20 symbols.
            </Form.Text>
        </Form.Group>
        <Form.Group className="my-3" controlId="formEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control type="email" placeholder="Enter your email adress" />
        </Form.Group>
        <Form.Group className="my-3" controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control type="password" placholder="Enter your password" />
            <Form.Text className="text-muted">
                8-20 symbols long
            </Form.Text>
        </Form.Group>
        <Form.Group className="my-3" controlId="formAvatar">
            <Form.Label>Profile picture</Form.Label>
            <Form.Control type="file" />
            <Form.Text className="text-muted">
                .png or .jpg files with 128x128 px size.
            </Form.Text>
        </Form.Group>
        <Container className="text-center"> 
            <Button className="mx-2 my-2 btn-md" variant="secondary">Close</Button>
            <Button className="mx-2 my-2 btn-md" variant="success" type="submit">Sign Up</Button>
        </Container>
    </Form>

);

export default signUp;