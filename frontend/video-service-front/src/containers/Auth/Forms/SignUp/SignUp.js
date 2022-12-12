import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import './SignUp.css';

class SignUp extends Component {
    state = {
        email: '',
        password: '',
        name: '',
        avatar: null,
        isFormValid: false
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
            name: this.state.name
        }
        this.props.authHandler(this.state.email, this.state.password, this.state.name);
        // if auth is okay
        this.props.hideModal();
    }


    render () {
        return (
        <Form onSubmit={this.authenticate}>
            <Form.Group controlId="formName">
                <Form.Label>Nickname:</Form.Label>
                <Form.Control 
                    type="text"
                    name="name"
                    placeholder="Enter your nickname" 
                    value={this.state.name}
                    onChange={this.inputChangedHandler}/>
                <Form.Text className="text-muted">
                    Your nickname should consist of english characters and 
                    numbers only with length about 8 - 20 symbols.
                </Form.Text>
            </Form.Group>
            <Form.Group className="my-3" controlId="formEmail">
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
                    password={this.state.password}
                    onChange={this.inputChangedHandler}/>
                <Form.Text className="text-muted">
                    8-20 symbols long
                </Form.Text>
            </Form.Group>
            <Form.Group className="my-3" controlId="formAvatar">
                <Form.Label>Profile picture</Form.Label>
                <Form.Control 
                    type="file"
                    name="avatar"
                    value={this.state.avatar}  
                    onChange={this.inputChangedHandler}/>
                <Form.Text className="text-muted">
                    .png or .jpg files with 128x128 px size.
                </Form.Text>
            </Form.Group>
            <Container className="text-center"> 
                <Button 
                    className="mx-2 my-2 btn-md"
                    variant="secondary"
                    onClick={this.props.hideModal}>Close</Button>
                <Button 
                    className="mx-2 my-2 btn-md"
                    variant="success" 
                    type="submit">Sign Up</Button>
            </Container>
        </Form>);
    }

}

export default SignUp;