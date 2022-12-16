
export const emailValidator = (event) => {
    return /\S+@\S+\.\S+/.test(event.target.value);
};

export const passwordValidator = (event) => {
    return event.target.value.length > 5;
};

export const formValidator = (event) => {
    switch (event.target.type) {
        case "email": return emailValidator(event);
        case "password": return passwordValidator(event);
    }
}

