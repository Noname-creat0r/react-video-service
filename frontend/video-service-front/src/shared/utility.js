import ListGroup from 'react-bootstrap/ListGroup';

export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const mapVideoInfoToCards = (info, handlers, VideoCard) => {
  const videoArr = [];
  info.videos.forEach((video, id) => {
      videoArr.push(
        <VideoCard
            key={id}
            title={video.title}
            authorName={video.authorName}
            thumbnail={'http://localhost:8080/video/thumbnail?id=' + video.thumbnail}
            clicked={event => handlers.click(event, id)}
            addToPlaylist={event => handlers.playlist(event, id)}
        />
      );
  });
  return videoArr;
};

export const mapNotificationToasts = (notifications, NotificationToast, clickHandler) => {
  return notifications.map( (notification, index) => {
    return <NotificationToast
        key={index}
        bg={notification.type}
        show={true}
        click={clickHandler} 
        text={notification.message}/>
  })
};

export const mapPlaylistsToCards = (playlistInfo, handlers, PlaylistCard) => {
  const playlistArr = [];
  playlistInfo.forEach( (playlist, id) => {
      playlistArr.push( 
        <PlaylistCard
          key={id}
          thumbnail={'http://localhost:8080/video/thumbnail?id=' + playlist.thumbnail}
          clicked={event => handlers.click(event, id)}
          delete={event => handlers.delete(event, id)}
          title={playlist.title} 
          videoNumber={playlist.videos.length}/>
      );
  });
 return playlistArr;
};

export const mapDataToTable = (data, Table) => {
  //console.log(data);
  const tableHeadData = Object
    .keys(data[0])
    .map(key => <th> {key} </th> );

  const tableBodyData = data.map(element =>
    <tr>
      { 
        Object
          .keys(element)
          .map(key => <th> {element[key]} </th> )
      }
    </tr>
  );

  //console.log(tableHeadData);
  //console.log(tableBodyData);
  return (
    <Table> 
      <thead> 
        <tr> 
          { tableHeadData }
        </tr>
      </thead> 
      <tbody> 
        { tableBodyData } 
      </tbody>
    </Table>)
}; 


export const videoCardClickHandler = (id, videoStreamStart) => {
  videoStreamStart(id);
  localStorage.setItem('videoId', id);
};

/*export const getAddToPlaylistList = (clickHandler ) => {
  const items = [];
  this.props.playlists.forEach((playlist) =>
      items.push(
          <ListGroup.Item 
              action
              onClick={() => clickHandler(playlist._id)}>
              {playlist.title} 
          </ListGroup.Item>
      )
  );
  items.push(
      <ListGroup.Item 
          action> 
          <Image 
              src={AddImage} 
              className='mx-1'
              width='15px'
              height='15px'/> 
              <b>Create new </b>
      </ListGroup.Item>
  );
  //console.log(this.props.playlists);
  return (
      <ListGroup>
          {items}
      </ListGroup>);
}*/
