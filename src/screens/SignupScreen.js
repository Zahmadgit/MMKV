import React, {useState, useEffect} from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { registerRequest } from "../store/userSlice";

const SignupScreen = ({navigation}) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const {loading, error} = useSelector((state) => state.user)
    const dispatch = useDispatch()


    const handleSignup = () =>{
        dispatch(registerRequest({name, email, password}))
        navigation.navigate('InfoScreen')
    }


    return(
        <View style={{alignSelf: 'center', justifyContent:'center'}}>
            <Text>Signup</Text>
            <TextInput placeholder="enter name" value={name} onChangeText={setName} style={styles.textContainer}></TextInput>
            <TextInput placeholder="enter email" value={email} onChangeText={setEmail} style={styles.textContainer}></TextInput>
            <TextInput placeholder="enter password" value={password} onChangeText={setPassword} secureTextEntry style={styles.textContainer}></TextInput>
            <Button title = "Sign up" onPress={handleSignup}></Button>

        </View>
    )
}


const styles = StyleSheet.create({
    textContainer:{
        borderWidth: 1
    }
})
export default SignupScreen