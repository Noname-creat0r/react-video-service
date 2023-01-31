import React from 'react';

import Error from './ErrorComponent/Error';

const NotFound = () => {
    return (
       <Error 
            errorCode={404}
            text="You may want to go back because it's a dead end here..."/>
    );
};

export default NotFound;