import { call, put, take, takeLatest } from "redux-saga/effects";
import { registerUser, getUserInfo } from "../services/userApi";
import { registerFailure, registerSuccess, registerRequest
    , fetchUserFailure, fetchUserSuccess, fetchUserRequest
 } from "./userSlice";

 function* handleRegister(action){
    try{
        const data = yield call(registerUser, action.payload)
        yield put(registerSuccess({
            user: data.data,
            token: data.data.token
        }))
    } catch (error){
        yield put(registerFailure(error.message))
    }
 }


 function* handleFetchUser(){
    try{
        const data = yield call(getUserInfo)
        yield put(fetchUserSuccess(data.data))
    } catch(error){
        yield put(fetchUserFailure(error.message))
    }
 }


 export function* userSaga(){
    yield takeLatest(registerRequest.type, handleRegister)
    yield takeLatest(fetchUserFailure.type, handleFetchUser)
 }