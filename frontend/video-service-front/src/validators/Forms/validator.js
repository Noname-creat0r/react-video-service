
export const emailValidator = (event) => {
    return /\S+@\S+\.\S+/.test(event.target.value);
};

export const passwordValidator = (event) => {
    return event.target.value.length > 5;
};

export const textValidator = (event) => {
    return event.target.value.length > 7;
}

export const fileImgValidator = (event) => {
    const path = event.target.value;
    return path
        .slice(path.lastIndexOf('.'), path.length)
        .match(/(\.png)|(\.jpg)|(\.jpeg)|(\.svg)/i)
        !== null;
}

export const fileVideoValidator = (event) => {
    const path = event.target.value;
    return path
        .slice(path.lastIndexOf('.'), path.length)
        .match(/(\.mp4)/i)
        !== null;
}

export const fileValidator = (event) => {
    const path = event.target.value;
    return path
        .slice(path.lastIndexOf('.'), path.length)
        .match(/(\.png)|(\.jpg)|(\.jpeg)|(\.svg)|(\.mp4)/i)
        !== null;
}

export const formValidator = (event) => {
    switch (event.target.type) {
        case 'email': return emailValidator(event);
        case 'password': return passwordValidator(event);
        case 'text': return textValidator(event);
        case 'file': return fileValidator(event);
    }
}

