import { Platform, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useContext } from "react";
import Colors from "../constants/colors";
import { Picker } from "@react-native-picker/picker";
import { PERSONS } from "../data/PersonData";
import { PersonsContext } from "../store/PersonsContext";
import { GiftAssignment } from "../models/GiftAssignment";


function PickerPresents({ presentKey, presentAssignedTo, onValueChange, assignGift }) {

    const { persons } = React.useContext(PersonsContext);

    const present = persons.find((p) => p._key === presentKey);



    return (
        <View style={styles.inputContainer}>
            <Text style={styles.label}>Assigned to:</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    style={styles.picker}
                    itemStyle={styles.pickerItem}
                    dropdownIconColor={Colors.accent500}
                    dropdownIconRippleColor={Colors.accent300}
                    selectedValue={presentAssignedTo}
                    mode={'dropdown'}
                    onValueChange={(itemValue, itemIndex) =>
                        assignGift(itemValue, presentKey)
                    }
                >
                    {persons.map((item, index) => {
                        return (<Picker.Item label={item.name} value={item.name} key={index} style={styles.pickerItem} />)
                    })}
                </Picker>
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    inputContainer: {
        width: '100%',
        marginTop: 10,
    },
    label: {
        color: Colors.primary500,
        fontSize: 18,
        marginBottom: 5,
    },
    invalidLabel: {
        color: Colors.accent500,
    },
    pickerContainer: {
        backgroundColor: Colors.primary500,
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 10,
        height: 50,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    invalidInput: {
        backgroundColor: Colors.accent500,
    },
    picker: {
        height: 50,
        width: '100%',
        color: Colors.primary500,
        backgroundColor: Colors.primary500,
        justifyContent: 'center',
        alignItems: 'center',
    },
});


export default PickerPresents;
