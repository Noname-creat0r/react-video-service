import React from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';

import './SignIn.css';

const signUp = (props) => (
    <Form>
        <Form.Group controlId="formEmail">
            <Form.Group controlId="formEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control type="email" placeholder="Enter your email adress" />
            </Form.Group>
            <Form.Group className="my-3" controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" placholder="Enter your password" />
            </Form.Group>
        </Form.Group>
        <Button className="mx-2 my-2 btn-md" variant="secondary">Close</Button>
        <Button className="mx-2 my-2 btn-md" variant="success" type="submit">Sign In</Button>
    </Form>
);

export default signUp;