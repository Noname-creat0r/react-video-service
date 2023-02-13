import React from 'react';
import * as modlaModes from '../../../shared/playlistModalModes';

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import AddItemCard from '../../UI/Card/AddItemCard/AddItemCard';

import './ProfileTabs.css';

const ProfileTabs = (props) => {
    return (
        <Tabs 
            defaultActiveKey="Videos"
            activeKey={props.tabActiveKey}
            onSelect={props.tabSelectHandler}>
            <Tab eventKey="Videos" title="Videos">
                <Row className='my-3'>
                    <AddItemCard
                        clicked={props.uploadVideoCardClicked}/>
                </Row>
                <Row>
                    <hr />
                    <Container className='d-flex flex-wrap'>
                        {props.videos}
                    </Container>
                </Row>
            </Tab>
            <Tab eventKey="Playlists" title="Playlists">
                <Row className='my-3'>
                    <AddItemCard
                        clicked={() => props.uploadPlaylistCardClicked(modlaModes.UPLOADING)}/>
                </Row>
                <Row>
                    <hr />
                    <Container className='d-flex flex-wrap'>
                        {props.playlists}
                    </Container>
                </Row>
            </Tab>
            
            <Tab eventKey="Settings" title="Settings">
                Settings
            </Tab>
            <Tab eventKey="About" title="About">
                About
            </Tab> 
        </Tabs>
    );
};

export default ProfileTabs;