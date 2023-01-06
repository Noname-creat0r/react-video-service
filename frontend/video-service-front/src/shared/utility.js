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

export const getFormControlGroups = (formInputs) => {
  let formContent = [];
  const groups = getGroupsBy(formInputs, 'group');

  for (const groupKey of Object.keys(groups)){
      let group = groups[groupKey];
      formContent.push(
          <Form.Group key={group}>
              {group}
          </Form.Group>
      );
  }
  
  return formContent;
};