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