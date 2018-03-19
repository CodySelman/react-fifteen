import axios from 'axios';

export const getImageUrls = () => {
    const url = `/images`;
    return axios.get(url);
};