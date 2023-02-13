import React, {Component} from 'react';
import { connect } from 'react-redux';
import { getGroupsBy, updateObject } from '../../shared/utility';
import * as formMethods from '../../shared/formUtil'; 
import * as actions from '../../store/actions/index';

import Input from '../../components/UI/Input/Input';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

class Auth extends Component {
    
    state = {
        currentAuthForm: 'SignIn',
        isFormValid: false,
        controls: {
            email: {
                elementType: 'input',
                groupConfig: {
                    group: 'email',
                    label: 'Email:',
                    form: ['SignIn', 'SignUp']
                },
                controlConfig: {
                    type: 'email',
                    placeholder: 'Your email',
                },
                validation: {
                    valid: false,
                    required: true
                },
                value: '',
                touched: false
            },
            password: {
                elementType: 'input',
                groupConfig: {
                    group: 'password',
                    label: 'Password:',
                    form: ['SignIn', 'SignUp']
                },
                controlConfig: {
                    type: 'password',
                    placeholder: 'Your strong password',
                },
                validation: {
                    valid: false,
                    required: true
                },
                value: '',
                touched: false
            },
            name: {
                elementType: 'input',
                groupConfig: {
                    group: 'name',
                    label: 'Nickname:',
                    form: 'SignUp'
                },
                controlConfig: {
                    type: 'text',
                    placeholder: 'Enter your nickname',
                },
                validation: {
                    valid: false,
                    required: true
                },
                value: '',
                touched: false
            },
            avatar: {
                elementType: 'input',
                groupConfig: {
                    group: 'file',
                    label: 'Profile picture:',
                    form: 'SignUp'
                },
                controlConfig: {
                    type: 'file',
                    accept: 'image/*'
                },
                validation: {
                    valid: false,
                    required: false
                },
                value: '',
                //file: '',
                touched: false
            }
        },
    };

    authFormSwitcher = () => {
        this.setState( (prevState) => {
            return { currentAuthForm: prevState.currentAuthForm === "SignIn" ?
                "SignUp" : "SignIn" }
        });
    }

    inputChangedHandler = (event) => {
       this.setState({ controls: formMethods.getUpdatedControls(event, this.state) });
       this.setState({ isFormValid: formMethods.checkFormValidity(this.state) });
    }

    authenticate = (event) => {
        event.preventDefault();
        this.props.onAuth(
            this.state.controls['email'].value,
            this.state.controls['password'].value,
            this.state.currentAuthForm === 'SignUp' ?
                this.state.controls['name'].value : undefined); 
    }

    render(){
                /* TODO: 
        - redirect after modal close  */

        const currentFormType = this.state.currentAuthForm === "SignIn" ? 
        "Sign In" : "Sign Up"; 
        
        const formElementsArray = [];
        for (let key in this.state.controls){
            if (Array.isArray(this.state.controls[key].groupConfig.form) ||
                this.state.controls[key].groupConfig.form === this.state.currentAuthForm)
                formElementsArray.push({
                    id: key,
                    config: this.state.controls[key]
                });
        }

        const formContent = formMethods.getFormControlGroups(
            formMethods.getFormInputsArray(formElementsArray, this.inputChangedHandler)
        );

        return (
            <Modal 
                show={this.props.show}
                onHide={this.props.hide}>

                <Modal.Header> 
                    {this.state.currentAuthForm}
                </Modal.Header>
                <Modal.Body> 
                    <Form id="authForm">
                        {formContent}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Container className="text-center"> 
                        <Button 
                            className="mx-2 my-2 btn-md"
                            variant="secondary"
                            onClick={this.props.hide}>
                                Close
                        </Button>
                        <Button 
                            className="mx-2 my-2 btn-md"
                            variant="success"
                            disabled={!this.state.isFormValid}
                            type="submit"
                            form="authForm"
                            onClick={this.authenticate}>
                               {currentFormType}
                        </Button>
                        <Button 
                            className='btn-sm mx-2 btn-success'
                            onClick={this.authFormSwitcher}>
                                Switch to {this.state.currentAuthForm === "SignIn" ? 
                                "Sign Up" : "Sign In"}
                        </Button>
                    </Container>
                </Modal.Footer>
            </Modal>
        );
    }
};

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, name) => dispatch(actions.auth( email, password, name)),
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( Auth );