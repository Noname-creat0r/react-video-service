import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';

import { formValidator } from '../../../../validators/Forms/validator';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import './SignUp.css';

class SignUp extends Component {

  
    

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
        let formInputs = {};

        return (
            <Form onSubmit={this.authenticate}>
                {formInputs}
                
            </Form>
        );
     }

}

export default SignUp;