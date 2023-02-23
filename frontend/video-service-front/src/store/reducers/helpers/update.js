const updateStateProperty = (state, dataObj) => {

    const updateArray = (array, action) => {
        switch (action){
            case 'ADD': return [...state[dataObj.label], ...dataObj.data];
            case 'UPDATE': return [...dataObj.data];
        }
    };
    
    const updateMap = (map, action) => {
        switch (action){
            case 'ADD': return new Map([...state[dataObj.label], [...dataObj.data]]);
            case 'UPDATE': return new Map([...dataObj.data]);
        }
    };

    switch (typeof dataObj.data){
        case ('object'): 
            switch (dataObj.data.constructor.name){
                case ('Map'):  return updateMap(dataObj.data, dataObj.action)
                case ('Array'):  return updateArray(dataObj.data, dataObj.action);
                //case ('Object'): updateObject();
            }
        case ('boolean'): return dataObj.data;
        case ('number'): return dataObj.data;
        case ('string'): return dataObj.data;
    }
    
};

const updateState = (state, action) => {
    const updatedState = {...state};
    for (const dataObj of action.data)
        updatedState[dataObj.label] = updateStateProperty(updatedState, dataObj);
    return updatedState;
};