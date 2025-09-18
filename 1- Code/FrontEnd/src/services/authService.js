import axios from 'axios';

const url = process.env.REACT_APP_API_URL; //get api url from environment variables

export const login = async (email, password) => {   //login function
    const response = await axios.post(`${url}/api/auth/login`, { email, password }); //axios post request to login
    const token = response.data.token; //get token from response
    const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT
    localStorage.setItem('token', token); //store token in local storage
    localStorage.setItem('isAdmin', payload.isAdmin); // Store admin status
    return payload.isAdmin; //return admin status
};

export const register = async (username, email, password) => {   //register function    
    await axios.post(`${url}/api/auth/register`, { username, email, password });
};