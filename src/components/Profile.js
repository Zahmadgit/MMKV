import React from 'react'
import { StyleSheet, View, Text } from 'react-native'




const Profile = () => {
    return(
        <View style = {styles.container}>
            <Text style = {styles.text}>
                Showcasing Lazy loading
            </Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'blue',
    },
    container2:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'yellow',
    },
    text:{
        color: 'white'
    }
});

export default Profile