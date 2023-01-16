import { useLayoutEffect, useState, useEffect } from "react";
import { View, TextInput, Button, Text, StyleSheet, Modal } from 'react-native';
import Colors from "../constants/colors";
import BudgetCard from "./BudgetCard";
import { PERSONS } from "../data/PersonData";
import { EVENTS } from "../data/EventData";
import PickerPersonInputField from "./BudgetPickerInputField";
import PickerEventInputField from "./BudgetEventPickerInputField";
import { v4 as generateUniqueKey } from 'uuid';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const AddBudgetModal = ({ cancelHandler, visible, setCurrentBudget, setShowAddModal, budgetCards, setBudgetCards, setSelectedCard, setShowEditModal }) => {
    const [inputValue, setInputValue] = useState('');
    const [title, setTitle] = useState('');
    const [budget, setBudget] = useState('');
    const [selectedPerson, setSelectedPerson] = useState([]);
    const [selectedPersons, setSelectedPersons] = useState([]);
    const [giftID, setGiftID] = useState("");
    const [person, setPerson] = useState("");
    const [selectedEvent, setSelectedEvent] = useState(null);

    const pickerEventValues = EVENTS.map((event) => event._name);
    const pickerValues = PERSONS.filter(person => !selectedPersons.includes(person)).map(person => person.name);    
    const saveHandler = () => {
        const names = selectedPersons.map(person => person.name).join(', ');
        const newBudgetCard = (
            <BudgetCard
                giftID={giftID}
                person={selectedPersons}
                event={selectedEvent}
                key={generateUniqueKey()}
                budgetCardId={generateUniqueKey()}
                title={title}
                names={names}
                // index={budgetCards.length}
                budget={budget}
                budgetCards={budgetCards}
                setBudgetCards={setBudgetCards}
                setSelectedCard={setSelectedCard}
                setShowEditModal={setShowEditModal}
            />

        );
        setBudgetCards([...budgetCards, newBudgetCard]);
        setSelectedPerson(null)
        setShowAddModal(false);
    };

    function cancelHandler() {
        console.log("Cancel");
        setShowAddModal(false);
    }


    useEffect(() => {
        if (visible) {
            setTitle('');
            setBudget('');
            setSelectedPerson(null);
            setSelectedEvent(null);
        }
    }, [visible]);


    const removePerson = (person) => {
        setSelectedPerson(selectedPerson.filter(p => p !== person));
    }


    return (
        <View>
            <Modal animationType="slide" visible={visible} transparent={false}>
                <View style={styles.container}>
                    <View style={styles.textContainer}>
                        <TextInput
                            placeholder="Enter your title"
                            placeholderTextColor="primary500"
                            style={styles.input}
                            onChangeText={(value) => setTitle(value)}
                            color="primary500"
                        />

                        <PickerPersonInputField
                            label="Add a Person here:"
                            selectedValue={selectedPersons.map(person => person.name)}
                            onValueChange={(itemValue) => {
                                const selectedPerson = PERSONS.find(person => person.name === itemValue);
                                setSelectedPersons([...selectedPersons, selectedPerson]);
                            }}
                            arrayOfValues={pickerValues}
                            mode="multiple"
                        />
                        {selectedPersons.length > 0 ?
                            <View>
                                {selectedPersons.map(person => (
                                    <View key={person.name} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text>{person.name}</Text>
                                        <TouchableOpacity onPress={() => {
                                            const updatedSelectedPersons = selectedPersons.filter(p => p.name !== person.name);
                                            setSelectedPersons(updatedSelectedPersons);
                                        }}>
                                            <Ionicons name="trash-outline" size={20} />
                                        </TouchableOpacity>
                                    </View>
                                ))}
                            </View>
                            : null
                        }


                        <PickerEventInputField
                            label="Add an Event here:"
                            selectedValue={selectedEvent ? selectedEvent: ''}
                            onValueChange={(itemValue) => setSelectedEvent(itemValue)}
                            arrayOfValues={pickerEventValues}

                        />
                        <TextInput
                            placeholder="Enter your budget"
                            placeholderTextColor="primary500"
                            keyboardType="numeric"
                            style={styles.input}
                            onChangeText={(value) => setBudget(value)}
                            color="primary500"

                        />
                    </View>
                    <View style={styles.button}>
                        <Button
                            title="Save"
                            onPress={saveHandler}
                            color={Colors.accent500}
                        />
                        <View style={{ marginTop: 200 }}>
                            <Button
                                title="Cancel"
                                onPress={cancelHandler}
                                color={Colors.accent500}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    text: {
        fontSize: 16,
        fontWeight: "400",
        textAlign: "center",
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
    },
});
export default AddBudgetModal;
