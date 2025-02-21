import React, {useState, useEffect} from "react";
import { View, Text, TextInput, Button, ActivityIndicator} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserRequest, loginRequest } from "../store/userSlice";
import { storage } from "../mmkvInstance";


const LoginScreen = ({navigation}) => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    handleLoginUser = () => {
        dispatch(loginRequest({email, password}))
        navigation.navigate('GoalScreen')
    }




    return(
        <View style={{alignSelf: 'center', justifyContent:'center'}}>
            <TextInput placeholder="enter email" value={email} onChangeText={setEmail} ></TextInput>
            <TextInput placeholder="enter password" value={password} onChangeText={setPassword} secureTextEntry></TextInput>
            <Button title = "Login" onPress={handleLoginUser}></Button>
        </View>
    )
}

export default LoginScreen