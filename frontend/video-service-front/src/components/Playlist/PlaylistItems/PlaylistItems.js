import React from 'react';

import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import CloseButton from 'react-bootstrap/CloseButton';

import './PlaylistItems.css';

const PlaylistItems = (props) => {
    //console.log(props.videosInfo.videos);
    const mappedVideos = props.videosInfo.videos.map((video, id) => 
        <Container className='PlaylistItem'>
            <bold>{id+1}</bold>
            <Image 
                className='PlaylistItemImage my-2 mx-2'
                src={'http://localhost:8080/video/thumbnail?id=' + video.thumbnail}
                height='100px'
                width='140px'/>
            <span className='PlaylistItemTitle'> {video.title} </span>
            <CloseButton className='PlaylistItemRemove'/>
        </Container>
       
    );
    

    return (
        <Container>
            {mappedVideos}
        </Container>
    );
};

export default PlaylistItems;