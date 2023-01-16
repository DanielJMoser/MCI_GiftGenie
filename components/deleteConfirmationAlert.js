import {Alert} from "react-native";

export function deleteConfirmationAlert  (object, deleteFunction, name, type) {
    let message = "Do you want to delete?"
    if (name && type) {
        message = "Do you want to delete the " + type + " " + name + "?";
    } else if (name) {
        message = "Do you want to delete " + name + "?";
    }
    Alert.alert(
        "Delete Confirmation",
        message,
        [
            {
                text: "Cancel",
                onPress: () => {
                },
                style: "cancel"
            },
            {
                text: "Delete",
                onPress: () => deleteFunction(object),
                style: "destructive"
            }
        ]
    );
}