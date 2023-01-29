import React from 'react';
import UserBadge from '../../../../UI/User/UserBadge/UserBadge';

import './VideoComment.css';

const VideoComment = (props) => {
    let date = new Date(props.createdAt);
    
    return (
        <div 
            className='my-3 py-2 text-black' 
            style={{background: 'radial-gradient(circle, rgba(180,136,170,1) 2%, rgba(255,255,255,1) 100%, rgba(135,91,125,1) 100%)', borderRadius: '20px' }}>
            <UserBadge name={props.authorName}/>
            <p className='mx-3'>{props.text}</p>
            <i className='mx-3'>{`${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()} ${date.getMinutes()}:${date.getSeconds()}`}</i>
        </div>
    );
};

export default VideoComment;