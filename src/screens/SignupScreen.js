import React, {useState, useEffect} from "react";
import { View, Text, TextInput, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { registerRequest } from "../store/userSlice";

const SignupScreen = ({navigation}) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const {loading, error, token} = useSelector((state) => state.user)
    const dispatch = useDispatch()

    useEffect(()=>{
        if(token){
            navigation.navigate('InfoScreen')
        }
    }, [token])

    const handleSignup = () =>{
        dispatch(registerRequest({name, email, password}))
    }


    return(
        <View style={{alignSelf: 'center', justifyContent:'center'}}>
            <Text>Signup</Text>
            <TextInput placeholder="enter name" value={name} onChangeText={setName} ></TextInput>
            <TextInput placeholder="enter email" value={email} onChangeText={setEmail} ></TextInput>
            <TextInput placeholder="enter password" value={password} onChangeText={setPassword} secureTextEntry></TextInput>
            <Button title = "Sign up" onPress={handleSignup}></Button>

        </View>
    )
}

export default SignupScreen