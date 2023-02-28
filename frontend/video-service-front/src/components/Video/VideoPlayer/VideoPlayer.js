import React from 'react';
import ReactPlayer from 'react-player';

import PlayIcon from '../../../assets/images/playlist.svg';

import './VideoPlayer.css';

const VideoPlayer = (props) => {
    return (
        <div className='player-wrapper'>
           <ReactPlayer
                /*onError={(error, data) => {console.log(error)}}
                onProgress={(state) => {
                    if (state.played > 0.15 && !props.viewed)
                        props.addView()
                }}*/
                controls={true}
                className='my-3 react-player'
                width='100%'
                height='100%'
                url={'http://localhost:8080/video?id=' + props.videoId}/>
        </div>
    );
};

export default VideoPlayer;