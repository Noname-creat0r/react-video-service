import React from 'react';

import Tab from 'react-bootstrap/Tab';
import Column from 'react-bootstrap/Col';

import UploadVideoCard from '../../../Card/UploadVideoCard/UploadVideoCard';

const ProfileVideosTab = () => {
    return (
        <Tab eventKey="Videos" title="Videos">
            <Column className='my-3'>
                <UploadVideoCard />
            </Column>
        </Tab>
    );
};

export default ProfileVideosTab;