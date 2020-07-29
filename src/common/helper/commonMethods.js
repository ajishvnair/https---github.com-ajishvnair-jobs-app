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
