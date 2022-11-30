import React, {Component} from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Button from 'react-bootstrap/Button';
import SignInForm from '../../components/Forms/SignIn/SignIn';
import SignUpForm from '../../components/Forms/SignUp/SignUp';
import Alert from 'react-bootstrap/Alert';

class Auth extends Component {
    
    state = {
        isAuth: false,
        showAuthModal: true,
        currentAuthForm: <SignUpForm />
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

    changeAuthFormHandler = () => {
        const authMode = this.state.currentAuthForm;
        this.setState({
            currentAuthForm: authMode === <SignUpForm /> ? <SignInForm /> : <SignUpForm />
        });
    };

    render(){
        
        return (
            <div className='container'>
                <Modal 
                    show={this.state.showAuthModal}
                    hide={this.showAuthModalHandler}
                    title="Sign Up">
                        <Alert key="primary" variant="success">
                            Already have an account?
                            <Button 
                                className="btn-sm mx-2"
                                variant="success"
                                onClick={this.changeAuthFormHandler}>
                                     Sign Up
                            </Button>
                            now!
                        </Alert>
                        {this.state.currentAuthForm}
                </Modal>
                
            </div>
        );
    }
};

export default Auth;