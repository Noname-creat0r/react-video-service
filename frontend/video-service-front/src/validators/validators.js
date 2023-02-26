/*import * as Yup from 'yup';

export const titleValidator = () => Yup
    .string()
    .min(3, "title should be at least 3 chars long")
    .max(25, "slow down, this is too much for title")
    .required("title required");

export const descriptionValidator = () => Yup
    .string()
    .min(3, "write a little about the video")
    .max(500, "whoa, are writing a book here?")
    .required("description required");

export const emailValidator = () => Yup
    .string()
    .email()
    .required("email required");

export const passwordValidator = () => Yup
    .text()
    .min(5, "short password")
    .max(40, "too long password");

export const usernameValidator = () => Yup
    .text()
    .min(5, "short nickname")
    .max(15, "too long nickname");
*/
// old validators 

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
/*
export const emailValidator = (event) => {
    return /\S+@\S+\.\S+/.test(event.target.value);
};
*/