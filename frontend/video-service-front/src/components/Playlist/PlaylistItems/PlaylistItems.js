import React from 'react';

import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import CloseButton from 'react-bootstrap/CloseButton';
import Arrow from '../../../assets/images/arrow-right.svg';

import './PlaylistItems.css';
import '../../../animations/popup.css';

const PlaylistItems = (props) => {
    //console.log(props.videosInfo.videos);
    const mappedVideos = props.videosInfo.videos.map((video, id) => {
        const isCurrent = props.currentVideoId === video._id ;
        const isBookmarked = props.bookmark.video === video._id; 
        return (
        <Container className={isCurrent ? 'PlaylistItem current animate pop' : 'PlaylistItem'}>
            <div onClick={() => props.setCurrent(video._id, localStorage.getItem('playlistId'))}>
                {
                    isCurrent ? 
                        <Image src={Arrow} width='30' height='30'/> :
                        <bold>{id+1}</bold> 
                    
                }
                <Image 
                    className='PlaylistItemImage my-2 mx-2'
                    src={'http://localhost:8080/video/thumbnail?id=' + video.thumbnail}
                    height='100px'
                    width='140px'/>
                <span className='PlaylistItemTitle'> {video.title} </span>
                { isBookmarked ?  <span className='text-warning'> last video watched</span> : '' }
            </div>
            <CloseButton 
                className='PlaylistItemRemove' 
                onClick={() => props.removeItem(video._id)}/>
        </Container>
        );
    });
    

    return (
        <Container>
            {mappedVideos.length > 0 ? 
                mappedVideos : 
                <h3 className='mx-4'>There are no videos yet...</h3>}
        </Container>
    );
};

export default PlaylistItems;