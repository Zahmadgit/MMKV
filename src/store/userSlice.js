import { createSlice } from "@reduxjs/toolkit";
import { storage } from "../mmkvInstance";
const initialState = {
    user: null,
    goals: [],
    loading: false,
    error: null
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        registerRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        registerSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.goals = [];
        },
        registerFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        loginRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.goals = [];
        },
        loginFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        createGoalRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        createGoalSuccess: (state, action) => {
            state.loading = false;
            state.goals.push(action.payload);
        },
        createGoalFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        fetchGoalsRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchGoalsSuccess: (state, action) => {
            state.loading = false;
            state.goals = action.payload;
        },
        fetchGoalsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.goals = [];
            state.loading = false;
            state.error = null;
            storage.delete('authTokenLogin');
        },
        updateGoalRequest: (state) =>{
            state.loading = true;
            state.error = null;
        },
        updateGoalSuccess: (state, action) => {
            state.loading = false;
            console.log('Reducer payload:', action.payload); // Add this log
            if (action.payload) {
                state.goals = state.goals.map(goal => 
                    goal._id === action.payload._id ? action.payload : goal
                );
            }
        },
        updateGoalFailure: (state, action) =>{
            state.loading = false;
            state.error = action.payload;
        },
        deleteGoalRequest: (state) =>{
            state.loading = true;
            state.error = null;
        },
        deleteGoalSuccess: (state, action) =>{
            state.loading = false;
            state.goals = state.goals.filter(
                goal => goal._id !== action.payload.id 
            );
        },
        deleteGoalFailure: (state, action) =>{
            state.loading = false;
            state.error = action.payload;
        },
    
    }
});

export const {
    registerFailure, registerRequest, registerSuccess,
    loginFailure, loginRequest, loginSuccess,
    createGoalFailure, createGoalSuccess, createGoalRequest,
    fetchGoalsFailure, fetchGoalsRequest, fetchGoalsSuccess, logout,
    updateGoalFailure, updateGoalRequest, updateGoalSuccess,
    deleteGoalFailure, deleteGoalRequest, deleteGoalSuccess
} = userSlice.actions;

export default userSlice.reducer;