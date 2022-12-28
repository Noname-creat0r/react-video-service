import React, {Component} from 'react';
import { connect } from 'react-redux';
import { getGroupsBy, updateObject } from '../../shared/utility';
import { formValidator } from '../../validators/Forms/validator';
 
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
        const controlName = event.target.name;
        const value = event.target.value;

        console.log(formValidator(event));
        const updatedControls = updateObject( this.state.controls, {
            [controlName]: updateObject( this.state.controls[controlName], {
              value: event.target.value,
              validation: updateObject( this.state.controls[controlName].validation, {
                valid: formValidator(event)
              }),
              touched: true
            })
        });

       this.setState({ controls: updatedControls})
    }

    render(){

                /* TODO: 
        - Bring footer and body to modal back (FIX buttons)
        - redirect after modal close 
        - dynamic <Input> 
        - Groups > Inputs  */

        const currentFormType = this.state.currentAuthForm === "SignIn" ? 
        "Sign Up" : "Sign In"; 
        
        const formElementsArray = [];
        for (let key in this.state.controls){
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        const formInputs = formElementsArray.map( element => (
            <Input
                key={element.id}
                elementType={element.config.elementType}
                elementConfig={element.config.controlConfig}
                group={element.config.groupConfig.group}
                label={element.config.groupConfig.label}
                value={element.config.value}
                name={element.id}
                isValid={element.config.validation.valid}
                changeHandler={this.inputChangedHandler}
                />
        ));

        let formContent = [];
        const groups = getGroupsBy(formInputs, 'group');
        for (const groupKey of Object.keys(groups)){
            let group = groups[groupKey];
            formContent.push(
                <Form.Group key={group}>
                    {group}
                </Form.Group>
            );
        }
       



        return (
            <Modal 
                show={this.props.show}
                onHide={this.props.hide}>

                <Modal.Header> {this.state.currentAuthForm} </Modal.Header>
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
                            onClick={this.props.hideModal}>
                                Close
                        </Button>
                        <Button 
                            className="mx-2 my-2 btn-md"
                            variant="success"
                            disabled={!this.state.isFormValid}
                            type="submit"
                            form="authForm">
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
        onAuth: (email, password, name) => dispatch(actions.auth( email, password, name))
    };
};


export default connect( mapStateToProps, mapDispatchToProps )( Auth );