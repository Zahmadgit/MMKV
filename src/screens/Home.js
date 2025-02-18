import React, {useState, useEffect, lazy, Suspense} from 'react'
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native'
import {storage} from '../mmkvInstance'

const ProfileComponent = lazy (() => import ('../components/Profile'))

const Home = () => {
    const [userName, setUserName] = useState('');
    const [userAge, setUserAge] = useState(null);
    const [speed, setSpeed] = useState(null);

    useEffect(()=>{
        storage.set('user.name', 'Marc')
        storage.set('user.age', 21)
        storage.set('is-mmkv-fast-asf', true)
        
        setUserName(storage.getString('user.name'))
        setUserAge(storage.getNumber('user.age'))
        setSpeed(storage.getBoolean('is-mmkv-fast-asf'))

   }, [])
    return(
        <View style = {styles.container}>
            <Text>
                user name from storage {userName}
            </Text>
            <Text>
                user age from storage {userAge}
            </Text>
            <Text>
                speed boolean from storage, fast? {speed ? 'Yes' : 'No'}
            </Text>

            
            <Suspense fallback = {<ActivityIndicator></ActivityIndicator>}>
                <ProfileComponent></ProfileComponent>
            </Suspense>
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'yellow'
    }
});

export default Home