import {StyleSheet, Text, TextInput, View} from "react-native";
import Colors from "../constants/colors";

function TextInputField({label, textInputConfig, isInvalid}) {
    return <View style={styles.inputContainer}>
        <Text style={[styles.label, isInvalid && styles.invalidLabel]}>
            {label}
        </Text>
        <TextInput style={[styles.input, isInvalid && styles.invalidInput]} {...textInputConfig}/>
    </View>
}

export default TextInputField;

const styles = StyleSheet.create({
    inputContainer: {
        marginHorizontal: 4,
        marginVertical: 12,
    },
    label: {
        fontSize: 16,
        color: Colors.accent300,
        marginBottom: 6,
            },
    input: {
        backgroundColor: Colors.primary400,
        color: 'white',
        padding: 6,
        paddingLeft: 14,
        borderRadius: 6,
        fontSize: 15
    },
    invalidLabel : {
        color: Colors.error
    },
    invalidInput: {
        backgroundColor: Colors.error
    },
});