import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';

import { formValidator } from '../../../../validators/Forms/validator';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import './SignUp.css';

class SignUp extends Component {
    state = {
        formInputs: {
            email: {
                value: '',
                error: undefined,
            },
            password: {
                value: '',
                error: false,
            },
            name: {
                value: '',
                error: false
            },
            avatar: {
                value: '',
                error: false
            }
        },
        isFormValid: false
    }

    inputChangedHandler = (event) => {
        const inputName = event.target.name;
        const value = event.target.value;
        const isValid = formValidator(event);

        this.setState({ 
            formInputs:  { [inputName]: {value: value, error: isValid} },
            isFormValid: isValid
         });

         alert(this.state.formInputs[inputName].error); 
    }

    isFormFilled = () => {
        const inputs = [...this.state.values];
        //return [...inputs].every((isFilled) => isFilled ? true : false);
    }

    authenticate = (event) => {
        event.preventDefault();
        if (this.isFormFilled()) { 
            const authData = {
                email: this.state.email,
                password: this.state.password,
                name: this.state.name
            }

            this.props.authHandler(this.state.email, this.state.password, this.state.name);
            this.props.hideModal();
        } else {
            // notification
            alert("Fill in all the form filds!");
        }
    }

    componentDidMount(){

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
                    numbers only with length more than 5 symbols.
                </Form.Text>
            </Form.Group>
            <Form.Group className="my-3" controlId="formEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control 
                    className={this.state.formInputs.email.error ? 'is-invalid' : 'is-valid'}
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
                    accept="imgage/*"
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
                    disabled={!this.state.isFormValid}
                    type="submit">Sign Up</Button>
            </Container>
        </Form>);
    }

}

export default SignUp;