import * as ImagePicker from "expo-image-picker";

const pickImage = async (callBack) => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 1,
    });

    if (!result.canceled) {
        callBack(result.assets[0].uri);
    }
};

export default pickImage;