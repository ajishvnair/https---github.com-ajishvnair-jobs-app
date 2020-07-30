import { icons } from "./dataProvider";

export const getIcon = () => {
    const index = Math.floor(Math.random() * (icons || []).length) + 1;
    return icons[index] ? icons[index] : icons[0];
};

export const validateEmail = (value) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        return true;
    }
    return false;
};

export const validateName = (value) => value.length > 5;

export const validatePhone = (value) => {
    const phno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (phno.test(value)) {
        return true;
    }
    return false;
};
