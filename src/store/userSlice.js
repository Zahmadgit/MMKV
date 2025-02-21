import { createSlice } from "@reduxjs/toolkit";
import { storage } from "../mmkvInstance";

const initialState = {
    user: null,
    loading: false,
    error: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        registerRequest:(state) =>{
            state.loading=true
            state.error=null
        },
        registerSuccess:(state, action)=>{
            state.loading = false
            state.user = action.payload.user
        },
        registerFailure:(state, action)=>{
            state.loading=false
            state.error = action.payload
        },
        fetchUserRequest: (state) =>{
            state.loading = true
            state.error = null
        },
        fetchUserSuccess: (state, action)=>{
            state.loading = false
            state.user = action.payload

        },
        fetchUserFailure: (state, action)=>{
            state.loading = false
            state.error = action.payload
        }
    }
})

export const {
    registerFailure, registerRequest, registerSuccess,
    fetchUserFailure, fetchUserRequest, fetchUserSuccess
} = userSlice.actions

export default userSlice.reducer