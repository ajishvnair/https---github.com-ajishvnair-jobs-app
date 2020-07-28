import { icons } from "./dataProvider";

export const getIcon = () => {
    const index = Math.floor(Math.random() * (icons || []).length) + 1;
    return icons[index] ? icons[index] : icons[0];
};
