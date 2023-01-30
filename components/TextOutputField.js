import {StyleSheet, Text, View} from "react-native";
import Colors from "../constants/colors";

function TextOutputField({label, text}) {
    return <View style={styles.outputContainer}>
        <Text style={styles.label}>
            {label}
        </Text>
        <Text style={styles.output}> {text}</Text>
    </View>
}

export default TextOutputField;

const styles = StyleSheet.create({
    outputContainer: {
        marginHorizontal: 4,
        marginVertical: 12,
    },
    label: {
        fontSize: 16,
        color: Colors.accent300,
        marginBottom: 6,
    },
    output: {
        backgroundColor: Colors.primary400,
        color: 'white',
        padding: 9,
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