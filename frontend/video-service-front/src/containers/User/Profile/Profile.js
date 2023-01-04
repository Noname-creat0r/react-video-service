import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../../axios-settings';
import * as actions from '../../../store/actions/index';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Column from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

import UserIcon from '../../../assets/images/default-user-icon.svg'; // need to download it from db
import ProfileTabs from '../../../components/UI/Profile/ProfileTabs/ProfileTabs';

import './Profile.css';

class Profile extends Component {
    state = {
    };

    /*
        1. Avatar + Username on a random background
        2. Profile tabs (Videos, Playlists, About)
        3. Content of the tabs
        4. footer

        - ProfileTabs component
    */

    componentDidMount() {
        this.props.fetchUserData(
            localStorage.getItem('userId'),
            localStorage.getItem('token')
        );
    }

    render(){
        return (
            <Container className="my-2">
                <Row> 
                    <Column className="col-3">
                        <Image 
                            src={UserIcon}
                            width={128}
                            height={128}
                            alt="UserIcon"
                            rounded/>
                    </Column>
                    <Column className="">
                        <span className="ProfileName">{ this.props.nickname }</span>
                    </Column>
                </Row>
                <Row>
                    <ProfileTabs />
                </Row>
                <Row>
                    
                </Row>
            </Container>
        );
    }
};

const mapStateToProps = state => {
    return {
        nickname: state.profile.data.name,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserData: (userId, token) => dispatch(actions.fetchData(userId, token)), 
    };
};

export default connect( mapStateToProps, mapDispatchToProps ) ( Profile );