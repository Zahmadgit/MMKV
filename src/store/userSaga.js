import { call, put, takeLatest } from "redux-saga/effects";
import { registerUser, getUserInfo, loginUser, createGoal, fetchGoals, updateGoal, deleteGoal } from "../services/userApi";
import { registerFailure, registerSuccess, registerRequest,
    loginFailure, loginRequest, loginSuccess,
    createGoalFailure, createGoalRequest, createGoalSuccess, 
    fetchGoalsFailure, fetchGoalsRequest, fetchGoalsSuccess,
    updateGoalFailure, updateGoalRequest, updateGoalSuccess,
    deleteGoalFailure, deleteGoalRequest, deleteGoalSuccess
} from "./userSlice";
import { storage } from "../mmkvInstance";

function* handleRegister(action) {
    try {
        const data = yield call(registerUser, action.payload);
        storage.set('authToken', data.data.authToken);
        yield put(registerSuccess(data.data));
    } catch (error) {
        yield put(registerFailure(error.message));
    }
}

function* handleLoginUser(action){
    try{
        const data = yield call(loginUser, action.payload);
        storage.set('authTokenLogin', data.data.authToken);
        console.log('handleLoginUser inside userSaga');
        yield put(loginSuccess(data.data));
    } catch (error){
        yield put(loginFailure(error.message));
    }
}


function* handleCreateGoal(action) {
    try {
        const createdGoal = yield call(createGoal, action.payload);
        yield put(createGoalSuccess(createdGoal));
        console.log('handleCreateGoal inside userSaga');
    } catch (error) {
        yield put(createGoalFailure(error.message));
    }
}

function* handleFetchGoals() {
    try {
        const goals = yield call(fetchGoals);
        yield put(fetchGoalsSuccess(goals));
        console.log('handleFetchGoals inside userSaga');
    } catch (error) {
        yield put(fetchGoalsFailure(error.message));
    }
}

function* handleUpdateGoal(action) {
    try {
        const {goalId, title} = action.payload;
        const updatedGoal = yield call(updateGoal, goalId, {title});
        console.log('handleUpdateGoal inside userSaga');
        yield put(updateGoalSuccess(updatedGoal));
        yield put(fetchGoalsRequest())
    } catch (error) {
        yield put(updateGoalFailure(error.message));
    }
}

function* handleDeleteGoal(action) {
    try {
        const response = yield call(deleteGoal, action.payload);
        yield put(deleteGoalSuccess(response));
        console.log('handleDeleteGoal inside userSaga');
    } catch (error) {
        yield put(deleteGoalFailure(error.message));
    }
}

export function* userSaga() {
    yield takeLatest(registerRequest.type, handleRegister);
    yield takeLatest(loginRequest.type, handleLoginUser);
    yield takeLatest(createGoalRequest.type, handleCreateGoal);
    yield takeLatest(fetchGoalsRequest.type, handleFetchGoals);
    yield takeLatest(updateGoalRequest.type, handleUpdateGoal);
    yield takeLatest(deleteGoalRequest.type, handleDeleteGoal);
}
