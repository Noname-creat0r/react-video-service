import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import axios from 'axios';

import Modal from '../../components/UI/Modal/Modal';
import Button from 'react-bootstrap/Button';
import SignInForm from './Forms/SignIn/SignIn';
import SignUpForm from './Forms/SignUp/SignUp';
import Alert from 'react-bootstrap/Alert';

class Auth extends Component {
    
    state = {
        isAuth: false,
        showAuthModal: true,
        currentAuthForm: "SignIn"
    };


    showAuthModalHandler = () => {
        this.setState( (prevState) => {
            return { showAuthModal: !prevState.showAuthModal};
        });
    };

    closeAuthModalHandler = () => {
        this.setState({
            showAuthModal: false
        });
    };

    authFormSwitcher = () => {
        this.setState( (prevState) => {
            return { currentAuthForm: prevState.currentAuthForm === "SignIn" ?
                "SignUp" : "SignIn" }
        });
    }

    render(){
//        <SignUpForm  authHandler={this.props.onAuth} />

        // TODO: - Bring footer and body to modal back (FIX buttons)
        //       - redirect after modal close 

        return (
            <div className='container'>
                <Modal 
                    show={this.state.showAuthModal}
                    hide={this.closeAuthModalHandler}
                    title={this.state.currentAuthForm === "SignIn" ? "Sign In" :"Sign Up"}>
                        <Alert key="primary" variant="success">
                            {this.state.currentAuthForm === "SignIn" ?
                                "Want to create new account? " :
                                "Already have an account ? "}
                                <Button 
                                    className='btn-sm mx-2 btn-success'
                                    onClick={this.authFormSwitcher}>
                                {this.state.currentAuthForm === "SignIn" ? "Sign Up" : "Sign In"}
                            </Button>
                        </Alert>
                        
                        {this.state.currentAuthForm === "SignIn" ?
                            <SignInForm  authHandler={this.props.onAuth}/> :
                            <SignUpForm  authHandler={this.props.onAuth}/>}
                </Modal>
                
            </div>
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
        onAuth: (email, password, name, isSignup) => dispatch(actions.auth( email, password, name, isSignup))
    };
};


export default connect( mapStateToProps, mapDispatchToProps )( Auth );