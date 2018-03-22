import axios from 'axios';

export const getImageUrls = (searchTerm) => {
    const url = `/images/${searchTerm}`;
    return axios.get(url);
};