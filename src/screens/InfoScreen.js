import React, {useState, useEffect} from "react";
import { View, Text, TextInput, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserRequest } from "../store/userSlice";


const InfoScreen = ({navigation}) => {

    const {loading, error, token, user} = useSelector((state) => state.user)
    const dispatch = useDispatch()

    useEffect(()=>{
        if(token){
            dispatch(fetchUserRequest(token))
        }
    }, [token])



    return(
        <View style={{alignSelf: 'center', justifyContent:'center'}}>
            <Text>Name: {user.name}</Text>
            <Text>Email: {user.email}</Text>
            <Text>Auth Token: {token}</Text>
        </View>
    )
}

export default InfoScreen