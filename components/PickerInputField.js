import {Platform, StyleSheet, Text, View} from "react-native";
import Colors from "../constants/colors";
import {Picker} from "@react-native-picker/picker";

function PickerInputField({label, selectedValue, onValueChange, isInvalid, arrayOfValues}) {

    return <View style={styles.inputContainer}>
                <Text style={[styles.label, isInvalid && styles.invalidLabel]}>
                     {label}
                </Text>
                <View style={[styles.pickerContainer, isInvalid && styles.invalidInput]}>
                    <Picker
                        style={styles.picker}
                        itemStyle={styles.pickerItem}
                        dropdownIconColor={Colors.accent500}
                        dropdownIconRippleColor={Colors.accent300}
                        selectedValue={selectedValue}
                        mode={'dropdown'}
                        onValueChange={(itemValue, itemIndex) =>
                            onValueChange(itemValue)
                        }
                    >
                        {arrayOfValues.map((item, index) => {
                            return (<Picker.Item label={item} value={item} key={index} style={styles.pickerItem} />)
                        })}
                    </Picker>
                </View>
            </View>
}

export default PickerInputField;

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
    pickerItem: {
        color: 'white',
        backgroundColor: Colors.primary400,
        padding: 6,
        borderRadius: 6,
        fontsize: 18,
    },
    picker: {
        color: 'white',
        padding: 6,
        fontsize: 18,
    },
    pickerContainer: {
        backgroundColor: Colors.primary400,
        padding: 6,
        borderRadius:6,
        fontsize: 18,
        height: Platform.OS === 'ios' ? 130 : 41,
        justifyContent: "center",
        overflow: "hidden"
    },
    invalidLabel : {
        color: 'palevioletred'
    },
    invalidInput: {
        backgroundColor: 'palevioletred'
    },
});