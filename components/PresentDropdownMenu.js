import { Platform, StyleSheet, View} from "react-native";
import Colors from "../constants/colors";
import { Picker } from "@react-native-picker/picker";
import { AssignmentContext } from "../store/AssignmentContext";
import React, { useState, useContext } from "react";
import { PersonsContext } from "../store/PersonsContext";
import { GiftAssignment } from "../models/GiftAssignment";
import AddButton from "../components/AddButton";

const PresentDropdownMenu = ({ presentID, ScreenConfig, TextConfig, selectedPerson, setSelectedPerson }) => {
    const assignmentContext = useContext(AssignmentContext);
    const personsContext = useContext(PersonsContext);
    const persons = personsContext.persons;

    let screenConfiguration = [];
    if (ScreenConfig) {
        screenConfiguration = ScreenConfig;
    }
    let textConfiguration = [];
    if (TextConfig) {
        textConfiguration = TextConfig;
    }

    let assignedToPersonKey = null;
    const assignedTo = assignmentContext.assignments.filter((assignment) => {
        return assignment._gift === presentID && (!assignment._event || assignment._event ==="");
    })
    if (assignedTo[0]?._person) {
        assignedToPersonKey = assignedTo[0]._person;
    }
    const [personToAssign, setPersonToAssign] = useState(assignedToPersonKey ? assignedToPersonKey : "0");

    const assignPerson = () => {
        const assignment = new GiftAssignment(
            presentID,
            personToAssign,
            ""
        );
        const assignmentsToRemove = assignmentContext.assignments.filter((assignment) => {
            return assignment._gift === presentID && (!assignment._event || assignment._event ==="");
        })
        assignmentsToRemove.forEach((assignment) => {
            assignmentContext.removeAssignment(assignment);
        })
        if (personToAssign !== "0") {
            assignmentContext.addAssignment(assignment);
        }
    };

    const removePresent = (presentID) => {
        const assignment = assignmentContext.assignments.find((assignment) => {
            return assignment._gift === presentID;
        });
        assignmentContext.removeAssignment(assignment);
    };

    const pickerItems = persons.map((person) => {
        return(
            <Picker.Item
                label={person._name}
                value={person._key}
                key={person._key}
            />
        );
    });
    pickerItems.unshift(
        <Picker.Item
            label={"Nobody"}
            value={0}
            key={0}
        />
    );
    const buyForMargin = Platform.OS === 'ios' ? 80 : 0;
    return (
        <View style={[styles.screen, screenConfiguration, {marginVertical: buyForMargin}]}>
            <Picker
                selectedValue={personToAssign}
                style={[styles.picker, textConfiguration]}
                itemStyle={styles.pickerItem}
                dropdownIconColor={Colors.accent500}
                dropdownIconRippleColor={Colors.accent300}
                onValueChange={(itemValue) =>
                    {
                        setPersonToAssign(itemValue)
                        if (setSelectedPerson) {
                            setSelectedPerson(itemValue);
                        }
                    }
                }
            >
                {pickerItems}
            </Picker>

            <View style={styles.button}>
                <AddButton
                    onPress={() => {
                        assignPerson();
                    }}
                />
            </View>
            
        </View>
    );
};



const styles = StyleSheet.create({
    screen: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: Colors.primary400,
        borderRadius: 10,
        height: 50,
        width: 346,
        paddingBottom: 5
    },
    title: {
        marginLeft: 20,
        marginTop: 20,
        fontSize: 20,
        color: 'white',
    },
    picker: {
        width: '60%',
        marginLeft: 20,
        marginTop: 20,
        marginBottom: 10,
        fontSize: 20,
        color: Colors.accent300,
    },
    pickerItem: {
        color: Colors.accent300,
        backgroundColor: Colors.primary400,
        padding: 6,
        fontSize: 18,
    },
    pickerContainer: {
        backgroundColor: '#00000000',
        padding: 6,
        borderRadius:6,
        fontSize: 18,
        height: Platform.OS === 'ios' ? 130 : 41,
        justifyContent: "center",
        overflow: "hidden",
    },
    button: {
        width: '20%',
        alignItems: "center",
        marginRight: 20,
    },
});

export default PresentDropdownMenu;
