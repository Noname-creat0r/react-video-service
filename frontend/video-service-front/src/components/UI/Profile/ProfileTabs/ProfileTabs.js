import React from 'react';

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Column from 'react-bootstrap/Col';

import UploadVideoCard from '../../Card/UploadVideoCard/UploadVideoCard';

import './ProfileTabs.css';

const ProfileTabs = (props) => {
    return (
        <Tabs defaultActiveKey="Videos">
            <Tab eventKey="Videos" title="Videos">
                <Column className='my-3'>
                    <UploadVideoCard
                        clicked={props.uploadVideoCardClicked}/>
                </Column>
            </Tab>
            <Tab eventKey="Playlists" title="Playlists">
                Playlists
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