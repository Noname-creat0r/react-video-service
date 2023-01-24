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
