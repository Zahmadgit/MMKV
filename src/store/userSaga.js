import { call, put, take, takeLatest } from "redux-saga/effects";
import { registerUser, getUserInfo } from "../services/userApi";
import { registerFailure, registerSuccess, registerRequest
    , fetchUserFailure, fetchUserSuccess, fetchUserRequest
 } from "./userSlice";
import { storage } from "../mmkvInstance";
import { Alert } from "react-native";

 function* handleRegister(action){
    try{
        const data = yield call(registerUser, action.payload)
        storage.set('authToken', data.data.token)
    } catch (error){
        yield put(registerFailure(error.message))
    }
 }


 function* handleFetchUser(){
    try{
        const data = yield call(getUserInfo)
        storage.set("user", data.data.name);
        storage.set("email", data.data.email);
        console.log("this is saga",storage.getString('email'))
        
    } catch(error){
        yield put(fetchUserFailure(error.message))
        return null
    }
 }

 

 export function* userSaga(){
    yield takeLatest(registerRequest.type, handleRegister)
    yield takeLatest(fetchUserRequest.type, handleFetchUser)
 }