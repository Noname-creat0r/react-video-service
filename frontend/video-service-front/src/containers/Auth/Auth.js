import React, {Component} from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Badge from 'react-bootstrap/Badge';

class Auth extends Component {
    state = {
        isAuth: false,
        showAuthModal: true
    };

    showAuthModalHandler = () => {
        this.setState( (prevState) => {
            return { showAuthModal: !prevState.showAuthModal};
        });
    };

    render(){

        const signInModal = {
            title: "Sign In",
            body: "Hello",
            footer: "Bye"
        }

        return (
            <div>
                <h1>Auth</h1>
                <Modal 
                    show={this.showAuthModalHandler}
                    hide={this.showAuthModalHandler} 
                    {...signInModal} />
            </div>
        );
    }
};

export default Auth;