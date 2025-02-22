import axios from 'axios'
import { storage } from '../mmkvInstance'
import { Platform } from 'react-native'

const apiURL = Platform.OS === 'android' ? 'http://10.0.2.2:8000/api' : 'http://localhost:8000/api';

const instance = axios.create({
    baseURL: apiURL
});
//🤣🤣🤣🤣
instance.interceptors.request.use(
    (config) => {
        const token = storage.getString('authTokenLogin'); 
        console.log(token)
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const registerUser = async (userData) => {
    const response = await instance.post('/users/', userData);
    return response.data;
};

export const loginUser = async (userData) => {
    const response = await instance.post('/users/login/', userData);
    console.log('LoginUser inside userApi');
    return response.data;
};

export const createGoal = async (goalData) => {
    const response = await instance.post('/goals/', goalData);
    console.log('createGoal inside userApi', response.data);
    return response.data.createdGoal;
};

export const fetchGoals = async () => {
    const response = await instance.get('/goals/');
    console.log('fetchGoals inside userApi', response.data);
    return response.data.data;
};