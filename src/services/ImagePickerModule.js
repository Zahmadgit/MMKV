import { NativeModules, PermissionsAndroid, Platform, Alert, Linking } from 'react-native';

const { ImagePickerModule } = NativeModules;

export const openImagePicker = async () => {
    if (Platform.OS === 'android') {
        console.log('Requesting storage permission...');
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
            {
                title: 'Storage Permission Required',
                message: 'This app needs access to your storage to select images',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            }
        );
        console.log('Permission result:', granted);

        // Check for never_ask_again result
        if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
            console.warn('Storage permission denied permanently. Please enable it in settings.');
            // Optionally show an alert to the user
            Alert.alert(
                'Permission Required',
                'Storage permission is required to select images. Please enable it in app settings.',
                [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'Open Settings', onPress: () => {
                        // Open app settings
                        Linking.openSettings();
                    }},
                ],
                { cancelable: false }
            );
            return;
        }

        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            console.error('Storage permission denied');
            return;
        }
    }

    try {
        const result = await ImagePickerModule.openPicker();
        console.log('Image URI:', result);
        return result;
    } catch (error) {
        console.error('Error opening image picker:', error);
    }
};
