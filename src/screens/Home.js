import React, {useState, useEffect, lazy, Suspense} from 'react'
import { StyleSheet, View, Text, ActivityIndicator, Button, Image } from 'react-native'
import {storage} from '../mmkvInstance'
import { openImagePicker } from '../services/ImagePickerModule'

const ProfileComponent = lazy (() => import ('../components/Profile'))

const Home = ({navigation}) => {
    const [userName, setUserName] = useState('');
    const [userAge, setUserAge] = useState(null);
    const [speed, setSpeed] = useState(null);
    const [imageUri, setImageUri] = useState(null);


    useEffect(()=>{
        storage.set('user.name', 'Marc')
        storage.set('user.age', 21)
        storage.set('is-mmkv-fast-asf', true)
        
        setUserName(storage.getString('user.name'))
        setUserAge(storage.getNumber('user.age'))
        setSpeed(storage.getBoolean('is-mmkv-fast-asf'))

   }, [])

   const handleImageSelection = async () => {
    try {
      const imageUri = await openImagePicker();
      if (imageUri) {
        console.log('Selected Image URI:', imageUri);
        //block scope yay
        setImageUri(imageUri)
      } else {
        console.log('No image selected');
      }
    } catch (error) {
      console.error('Error selecting image:', error);
    }
  };
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
            <Button title="Go to Signup" onPress={()=> navigation.navigate('SignupScreen')}></Button>
            <Button title="Select Image" onPress={handleImageSelection} />
            {imageUri && ( // Conditionally render the image if an URI is available
                <Image
                    source={{ uri: imageUri }}
                    style={{ width: 200, height: 200 }} 
                />
            )}
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