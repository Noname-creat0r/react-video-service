import React from 'react';

import Container from 'react-bootstrap/Container';
import PlaylistItem from './PlaylistItem/PlaylistItem';

import { mapVideoInfoToCards } from '../../../shared/utility';

const PlaylistItems = (props) => {
    const mappedVideos = props.videosInfo.map((info) => 
        <PlaylistItem 
            thumbnail={info.thumbnail}
            title={info.title}/>
    );
    

    return (
        <Container>
            {mappedVideos}
        </Container>
    );
};

export default PlaylistItems;