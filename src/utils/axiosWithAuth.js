import axios from 'axios';

export const axiosWithAuth = () => {
  
    const token = localStorage.getItem('token');

    return axios.create({
        headers: {
        Authorization: token
        },
        baseURL: 'http://use-my-tech-stuff-5.herokuapp.com/api/'
    });
};
