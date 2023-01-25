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

export function* readBlobToBase64(blob, callback) {
  const reader = yield new FileReader();
  reader.onload = function* () {
    yield callback(reader.result);
  };
  yield reader.readAsDataUrl(blob);
}

export const mapVideoInfoToCards = (videoInfo, clickHandler, VideoCard) => {
  const videoArr = [];
  videoInfo.forEach((video, id) => {
      //console.log(id);
      videoArr.push(
          <VideoCard
              key={id}
              title={video.title}
              thumbnail={'http://localhost:8080/video/thumbnail?id=' + video.thumbnail}
              clicked={event => clickHandler(event, id)}
              //clicked={event => this.profileVideoCardClickHandler(event, id)}
          />);
  });
  return videoArr;
};

