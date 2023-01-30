import {Platform, StyleSheet, Text, View} from "react-native";
import Colors from "../constants/colors";
import {Picker} from "@react-native-picker/picker";

function PickerInputField({label, selectedValue, onValueChange, isInvalid, arrayOfValues, labelConfig, textConfig, containerConfig}) {
    let labelConfiguration = [];
    let textConfiguration = [];
    let containerConfiguration = []
    if (labelConfig) {
        labelConfiguration = labelConfig;
    }
    if (textConfig) {
        textConfiguration = textConfig;
    }
    if (containerConfig) {
        containerConfiguration = containerConfig;
    }
    return <View style={styles.inputContainer}>
                <Text style={[ styles.label, isInvalid && styles.invalidLabel, labelConfiguration]}>
                     {label}
                </Text>
                <View style={[styles.pickerContainer, isInvalid && styles.invalidInput, containerConfiguration]}>
                    <Picker
                        style={[styles.picker, textConfiguration]}
                        itemStyle={[styles.picker, textConfiguration]}
                        dropdownIconColor={Colors.accent500}
                        dropdownIconRippleColor={Colors.accent300}
                        selectedValue={selectedValue}
                        mode={'dropdown'}
                        onValueChange={(itemValue, itemIndex) =>
                            onValueChange(itemValue)
                        }
                    >
                        {arrayOfValues.map((item, index) => {
                            return (<Picker.Item label={item} value={item} key={index} style={[styles.pickerItem, textConfiguration]} />)
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
        fontSize: 18,
    },
    picker: {
        color: 'white',
        padding: 6,
        fontSize: 18,
    },
    pickerContainer: {
        backgroundColor: Colors.primary400,
        padding: 6,
        borderRadius: 6,
        fontsize: 18,
        height: Platform.OS === 'ios' ? 130 : 41,
        justifyContent: "center",
        overflow: "hidden"
    },
    invalidLabel : {
        color: Colors.error
    },
    invalidInput: {
        backgroundColor: Colors.error
    },
});