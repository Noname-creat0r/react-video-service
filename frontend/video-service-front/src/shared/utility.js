export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const getGroupsBy = (arrOfObj, category) => {
    const groups = {};
    for (const obj of arrOfObj){
        if (obj[category] in groups){
          groups[obj[category]].push(obj);
        } else {
          groups[obj[category]] = [obj];
        }
    }
    return groups;
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


export const videoCardClickHandler = (id, videoStreamStart) => {
  videoStreamStart(id);
  localStorage.setItem('videoId', id);
};

export const addToPlaylistClickHandler = (
  fetchPlaylistMethod,
  showPlaylistModal,
  modalMode,
  notificate 
) => {
  if (!localStorage.getItem('userId'))
    notificate(
      'Sign in to manage playlists', 'warning');
  else {
    fetchPlaylistMethod(
      '/', { userId: localStorage.getItem('userId') })
    showPlaylistModal(modalMode);
  }
};
