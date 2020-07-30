import axios from "axios";

import { GET_URL, POST_URL } from "../../environments/Environments";

const getBaseUrl = (type, url) => {
    switch (type) {
        case "get":
            return `${GET_URL}${url}`;
        case "post":
            return `${POST_URL}${url}`;
    }
};

export default {
    getAction: (url) => axios.get(getBaseUrl("get", url)).catch((err) => {}),
    postAction: (url, payload, headers = {}) =>
        axios
            .post(getBaseUrl("post", url), payload, headers)
            .catch((err) => {}),
};
