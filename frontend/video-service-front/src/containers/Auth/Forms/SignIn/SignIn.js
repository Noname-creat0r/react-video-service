import React, { Component } from 'react';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';

import './SignIn.css';

class SignIn extends Component {

    state = {
        email: undefined,
        password: undefined,
        isFormValid: false,
    }

    inputChangedHandler = (event) => {
        const inputName = event.target.name;
        const value = event.target.value;

        this.setState({
            [inputName]: value
        });
    }

    authenticate = (event) => {
        event.preventDefault();
        const authData = {
            email: this.state.email,
            password: this.state.password,
        }
        this.props.authHandler(this.state.email, this.state.password);
        // if auth is ok
        this.props.hideModal();
    }

    render() {
        return (
            <Form onSubmit={this.authenticate}>
                <Form.Group controlId="formEmail">
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control 
                            type="email"
                            name="email" 
                            placeholder="Enter your email adress"
                            value={this.state.email}
                            onChange={this.inputChangedHandler}/>
                    </Form.Group>
                    <Form.Group className="my-3" controlId="formPassword">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control 
                            type="password"
                            name="password"
                            placholder="Enter your password" 
                            value={this.state.password}
                            onChange={this.inputChangedHandler}/>
                    </Form.Group>
                </Form.Group>
                <Container className="text-center"> 
                    <Button 
                        className="mx-2 my-2 btn-md" 
                        variant="secondary"
                        onClick={this.props.hideModal}>Close</Button>
                    <Button 
                        className="mx-2 my-2 btn-md" 
                        variant="success" 
                        type="submit">Sign In</Button>
                </Container>
            </Form>
        );
    };
    
};

export default SignIn;