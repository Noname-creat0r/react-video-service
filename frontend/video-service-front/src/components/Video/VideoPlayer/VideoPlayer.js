import React from 'react';
import ReactPlayer from 'react-player';

import PlayIcon from '../../../assets/images/playlist.svg';

import './VideoPlayer.css';

const VideoPlayer = (props) => {
    return (
        <div className='player-wrapper'>
           <ReactPlayer
                controls={props.controls}
                className='my-3 react-player'
                width='100%'
                height='100%'
                url={process.env.REACT_APP_BASE_SERVER_URL + '/video?id=' + props.videoId}/>
        </div>
    );
};

export default VideoPlayer;
