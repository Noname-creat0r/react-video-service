import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Auth from '../Auth/Auth';
import Video from '../Video/Video';

import './Layout.css';
import UploadVideoForm from '../Video/UploadVideoForm/UploadVideoForm';

class Layout extends Component {
    state = {
        showSideDrawer: false,
        showAuthModal: false,
        showVideoPage: false,
    };

    sideDrawerToggleHandler = () => {
        this.setState( ( prevState ) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        } );
    }

    sideDrawerCloseHandler = () => {
        this.setState( { showSideDrawer: false });
    }

    authModalToggleHandler = () => {
        this.setState( (prevState)  => {
            return { showAuthModal: !prevState.showAuthModal };
        });
    }

    videoPageShowHandler = () => {
        this.setState( (prevState)  => {
            return { showVideoPage: !prevState.showVideoPage };
        });
    }

    componentDidMount() {
      
    }

    componentDidUpdate() {
        if (this.props.isAuthenticated && this.props.userName == null){
            this.props.fetchUserData( 
                localStorage.getItem('userId'),
                localStorage.getItem('token'));
        
        }
    }

    render() {
        return(
            <div>
                <Toolbar 
                    isAuthenticated={this.props.isAuthenticated}
                    userName={this.props.userName}
                    drawerToggleClicked={this.sideDrawerToggleHandler} 
                    authModalRequested={this.authModalToggleHandler}/>
                <SideDrawer 
                    isAuthenticated={this.props.isAuthenticated}
                    isOpen={this.state.showSideDrawer}
                    close={this.sideDrawerCloseHandler}/>
                <main>
                    <Auth 
                        show={this.state.showAuthModal}
                        hide={this.authModalToggleHandler}/>

                    {this.props.children}

                </main>
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        userName: state.profile.data.name,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserData: async (userId, token) => dispatch(actions.fetchData(userId, token)),
     };
};

export default connect( mapStateToProps, mapDispatchToProps ) ( Layout );