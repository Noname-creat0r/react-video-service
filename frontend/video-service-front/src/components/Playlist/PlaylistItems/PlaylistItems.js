import React from 'react';

import Container from 'react-bootstrap/Container';
import PlaylistItem from './PlaylistItem/PlaylistItem';

import { mapVideoInfoToCards } from '../../../shared/utility';

const PlaylistItems = (props) => {
    const mappedVideos = mapVideoInfoToCards(
        { videos: props.videos,},
        { click: props.videoClickHandler,
          playlist: props.addToPlaylist},
        PlaylistItem,
    ); 

    return (
        <Container>
            {mappedVideos}
        </Container>
    );
};

export default PlaylistItems;