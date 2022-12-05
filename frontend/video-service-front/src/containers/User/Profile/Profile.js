import React, { Component } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Column from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import UserIcon from '../../../assets/images/default-user-icon.svg'; // need to download it from db

import './Profile.css';

class Profile extends Component {
    state = {
    };

    /*
        1. Avatar + Username on a random background
        2. Profile tabs (Videos, Playlists, About)
        3. Content of the tabs
        4. footer
    */

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
                        <span className="ProfileName">Unknown</span>
                    </Column>
                </Row>
                <Row>
                    <Tabs
                        defaultActiveKey="Playlists">
                        <Tab eventKey="Playlists" title="Playlists">
                            Playlists
                        </Tab>
                        <Tab eventKey="Videos" title="Videos">
                            Videos
                        </Tab>
                        <Tab eventKey="Settings" title="Settings">
                            Settings
                        </Tab>
                        <Tab eventKey="About" title="About">
                            About
                        </Tab> 
                    </Tabs>
                </Row>
                <Row>

                </Row>
            </Container>
        );
    }
};

export default Profile;