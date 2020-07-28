import axios from "axios";

const LOCALHOST = "https://muscateer.om/EN/";

const getBaseUrl = (url) => `${LOCALHOST}${url}`;

export default {
    getAction: (url) => axios.get(getBaseUrl(url)).catch((err) => {}),
    postAction: (url, payload, headers = {}) =>
        axios.post(getBaseUrl(url), payload, headers).catch((err) => {}),
};
