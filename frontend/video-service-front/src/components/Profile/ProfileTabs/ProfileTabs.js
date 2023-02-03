import React from 'react';

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Column from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import UploadVideoCard from '../../UI/Card/UploadVideoCard/UploadVideoCard';
import ProfileVideoCard from '../../UI/Card/ProfileVideoCard/ProfileVideoCard';

import './ProfileTabs.css';
import Container from 'react-bootstrap/esm/Container';

const ProfileTabs = (props) => {
    /*const videoCards = props.videos.map((video) => 
        <ProfileVideoCard 
           clicked={props.videoCardClick}
           thumbnail={video.thumbnail}
           title={video.title} />
    );*/
    
    return (
        <Tabs 
            defaultActiveKey="Videos"
            activeKey={props.tabActiveKey}
            onSelect={props.tabSelectHandler}>
            <Tab eventKey="Videos" title="Videos">
                <Row className='my-3'>
                    <UploadVideoCard
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