import React, {useState, useEffect} from "react";
import { View, Text, TextInput, Button, ActivityIndicator} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserRequest } from "../store/userSlice";
import { storage } from "../mmkvInstance";


const InfoScreen = ({navigation}) => {
    const dispatch = useDispatch()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [token, setToken] = useState(null)

    handleFetchUser = () => {
        const storedToken = storage.getString('authToken')
        if(storedToken){
            setToken(storedToken)
            dispatch(fetchUserRequest(token))
        }
        
        setName(storage.getString('user'))
        setEmail(storage.getString('email'))
        console.log("this is INfoScnree",(storage.getString('email')))
    }




    return(
        <View style={{alignSelf: 'center', justifyContent:'center'}}>
            <Button title = "Fetch user info" onPress={handleFetchUser}></Button>
            <Text>Name: {name || "N/A"}</Text>
            <Text>Email: {email || "N/A"}</Text>
            <Text>Auth Token: {token}</Text>
            <Button title="Go to Login" onPress={()=> navigation.navigate('LoginScreen')}></Button>
            
        </View>
    )
}

export default InfoScreen