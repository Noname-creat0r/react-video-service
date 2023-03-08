import React from 'react';
import UserBadge from '../../../../UI/User/UserBadge/UserBadge';

import './VideoComment.css';

const VideoComment = (props) => {
    const date = new Date(props.createdAt);
    const options = { 
      weekday: 'short',
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
  };
  
    return (
        <div 
            className='my-3 py-2 text-black'> 
              <UserBadge 
                name={props.authorName}
                avatarId={props.authorAvatar}/>
              <p className='mx-3'>{props.text}</p>
              <i className='mx-3'>{date.toLocaleDateString('en-US', options)}</i>
        </div>
    );
};

export default VideoComment;
