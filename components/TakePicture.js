import * as ImagePicker from "expo-image-picker";
import {Alert} from "react-native";
import * as FileSystem from 'expo-file-system';

const takePicture = async (callBack) => {
    try {
        const permissions = await ImagePicker.requestCameraPermissionsAsync();

        if(permissions.status !== 'granted' && !permissions.canAskAgain) {
            Alert.alert('Insufficient Permissions', 'Please change your permissions in the system settings so that Gift Genie can access the camera.', [{text: 'Got it.'}])
            return;
        }

        const imageRes = await ImagePicker.launchCameraAsync();

        if(!imageRes || imageRes.canceled === true || !imageRes.assets[0].uri) {
            return;
        }

        const imageUri = imageRes.assets[0].uri;

        const persistentPath = FileSystem.documentDirectory + imageUri.split('/').pop();

        await FileSystem.copyAsync({
            from: imageUri,
            to: persistentPath,
        });

        callBack(persistentPath);

    } catch (error) {
        console.log('An error occured while trying to take an image.', error);
    }
};

export default takePicture;