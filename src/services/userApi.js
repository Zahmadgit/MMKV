import axios from 'axios'
import { storage } from '../mmkvInstance'
import { Platform } from 'react-native'

const apiURL = Platform.OS === 'android' ? 'http://10.0.2.2:8000/api/users':'http://localhost:8000/api/users'


//making a new instance of axios with custom configs
const instance = axios.create({
    baseURL: apiURL
})

instance.interceptors.request.use(
    //mmkv is fully synchronous so we dont need async
    //mmkv encryption might not work in android
    (config) =>{
        const token = storage.getString('authToken')
        if(token){
            config.headers.Authorization = `Bearer ${token}`
        }  
        return config
        
    },
    (error) => Promise.reject(error)
)


export const registerUser = async(userData)=>{
    const responce = await instance.post('/', userData)
    return responce.data
}


export const getUserInfo = async()=>{
    const responce = await instance.get('/')
    return responce.data
}