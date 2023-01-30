import { useState, useEffect, useContext} from "react";
import { View, TextInput, Text, StyleSheet, Modal, SafeAreaView } from 'react-native';
import Colors from "../constants/colors";
import BudgetCard from "./BudgetCard";
import PickerPersonInputField from "./BudgetPickerInputField";
import PickerEventInputField from "./BudgetEventPickerInputField";
import { v4 as generateUniqueKey } from 'uuid';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from '@expo/vector-icons';
import {PersonsContext} from "../store/PersonsContext";
import {EventsContext} from "../store/EventsContext";


const AddBudgetModal = ({ cancelHandler, visible, setCurrentBudget, setShowAddModal, budgetCards, setBudgetCards, setSelectedCard, setShowEditModal }) => {
    const eventsCtx = useContext(EventsContext);
    const EVENTS = eventsCtx.events;
    const personsCtx = useContext(PersonsContext);
    const PERSONS = personsCtx.persons;
    const [title, setTitle] = useState('');
    const [budget, setBudget] = useState('');
    const [selectedPerson, setSelectedPerson] = useState([]);
    const [selectedPersons, setSelectedPersons] = useState([]);
    const [giftID, setGiftID] = useState("");
    const [selectedEvent, setSelectedEvent] = useState(null);

    const pickerEventValues = EVENTS.map((event) => event._name);
    const pickerValues = PERSONS.filter(person => !selectedPersons.includes(person)).map(person => person.name);    
    const saveHandler = async () => {
        if (selectedPersons.length === 0) {
            alert("Select at least one person!");
            return;
        }
        if (isNaN(parseFloat(budget))) {
            alert("Budget must be a number!");
            return;
        }
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
                budget={budget}
                budgetCards={budgetCards}
                setBudgetCards={setBudgetCards}
                setSelectedCard={setSelectedCard}
                setShowEditModal={setShowEditModal}
            />
        );
        let existingBudgetCards = await AsyncStorage.getItem("budgetCards");
        existingBudgetCards = JSON.parse(existingBudgetCards);
        if (!existingBudgetCards) {
            existingBudgetCards = [];
        }
        existingBudgetCards.push(newBudgetCard);
        await AsyncStorage.setItem("budgetCards", JSON.stringify(existingBudgetCards));
        setBudgetCards([...budgetCards, newBudgetCard]);
        setSelectedPerson(null)
        setShowAddModal(false);
    };


    function cancelHandler() {
        setShowAddModal(false);
    }

    useEffect(() => {
        if (visible) {
            setTitle('');
            setBudget('');
            setSelectedPersons([]);
            setSelectedEvent(null);
        }
    }, [visible]);


    const removePerson = (person) => {
        setSelectedPerson(selectedPerson.filter(p => p !== person));
    }


    return (
        <View>
            <Modal animationType="slide" visible={visible} transparent={false}>
                <SafeAreaView style={styles.headerContainer}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity onPress={cancelHandler} style={{ marginLeft: 10, alignSelf: 'flex-start' }}>
                            <AntDesign name="arrowleft" size={24} color="black" />
                        </TouchableOpacity>
                        <Text style={{ width: 0, flex: 1, textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}> Create a BudgetCard</Text>
                        <TouchableOpacity style={styles.saveButton} onPress={saveHandler}>
                            <Ionicons name="save-outline" size={24} color={"white"} />
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>

                    <View style={styles.textContainer}>
                        <View style={styles.labelContainer}>
                            <Text style={styles.label}>Enter your Title here:</Text>
                        </View>
                        <TextInput
                            placeholder="Enter your Title"
                            placeholderTextColor="white"
                            style={{ ...styles.input}}
                            onChangeText={(value) => setTitle(value)}
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
                                        <Text style={[styles.selectedPersons, { flex: 1, textAlign: 'center' }]}>{person.name}</Text>
                                        <TouchableOpacity onPress={() => {
                                            const updatedSelectedPersons = selectedPersons.filter(p => p.name !== person.name);
                                            setSelectedPersons(updatedSelectedPersons);
                                        }}>
                                            <Ionicons name="trash-outline" size={20} color={"white"} />
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
                        <View style={styles.labelContainer}>
                            <Text style={styles.label}>Enter your Budget here:</Text>
                        </View>
                        <TextInput
                            placeholder="Enter your Budget"
                            placeholderTextColor="white"
                            keyboardType="numeric"
                            style={styles.input}
                            onChangeText={(value) => setBudget(value)}
                        />
                    </View>
            </Modal>
        </View>
    );
};


const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: Colors.accent500,
    },
    headerContainer: {
        backgroundColor: Colors.accent500,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
    },
    textContainer: {
        backgroundColor: Colors.primary500,
        flex: 1,
    },
    selectedPersons: {
        color: 'white',
        textAlign: 'center',
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
    backButton: {
        position: 'absolute',
        alignSelf: "flex-start",
        top: 40,
        left: 20,
    },
    saveButton: {
        borderRadius: 18,
        backgroundColor: Colors.primary400,
        padding: 6,
        elevation: 3,
    },
    input:{
        backgroundColor: Colors.primary400,
        placeholderTextColor: 'white',
        color: 'white',
        padding: 6,
        borderRadius: 6,
        fontSize: 16,
        width: '98%',
        alignSelf: 'center',
    },
    labelContainer: {
        marginTop: "2%",
        marginBottom: 8,
        marginLeft: "1%",
    },
    label: {
        fontSize: 16,
        color: Colors.accent300,
        marginBottom: 4,
    },
});
export default AddBudgetModal;
