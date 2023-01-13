import React from 'react';
import ReactPlayer from 'react-player';

import './VideoPlayer.css';

const VideoPlayer = (props) => {
    return (
        <div className='player-wrapper'>
            <ReactPlayer
                className='my-3 react-player'
                width='100%'
                height='100%'
                url='https://www.youtube.com/watch?v=y6Z-SZt-Xvw&t=199s'/>
        </div>
    );
};

export default VideoPlayer;