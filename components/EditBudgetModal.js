import {useEffect, useState, useContext} from "react";
import { View, TextInput, Text, StyleSheet, Modal } from 'react-native';
import Colors from "../constants/colors";
import PickerPersonInputField from "./BudgetPickerInputField";
import PickerEventInputField from "./BudgetEventPickerInputField";
import BudgetCard from "./BudgetCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import {EventsContext} from "../store/EventsContext";
import {PersonsContext} from "../store/PersonsContext";


const saveBudgetCards = async (budgetCards) => {
    try {
        const budgetCardsJson = JSON.stringify(budgetCards, getCircularReplacer());
        await AsyncStorage.setItem("budgetCards", budgetCardsJson);
    } catch (error) {
        console.error(error);
    }
};

const getCircularReplacer = () => {
    const seen = new WeakSet();
    return (key, value) => {
        if (typeof value === "object" && value !== null) {
            if (seen.has(value)) {
                return;
            }
            seen.add(value);
        }
        return value;
    };
};


const EditBudgetModal = ({ budgetCards, setBudgetCards, selectedCard, setSelectedCard, budgetCard, giftIdProp, fetchData, setShowEditModal, visible }) => {
    const eventsCtx = useContext(EventsContext);
    const EVENTS = eventsCtx.events;
    const personsCtx = useContext(PersonsContext);
    const PERSONS = personsCtx.persons;
    const selectCard = budgetCards[selectedCard].props
    const [budgetState, setBudget] = useState(selectCard.budget);
    const [giftIdState, setGiftID] = useState(giftIdProp);
    const namesArray = selectCard.names.split(", ");
    const [selectedPersons, setSelectedPersons] = useState(namesArray.map(name => ({ name })));
    const [titleState, setTitle] = useState(null);
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [availableValues, setAvailableValues] = useState(pickerValues);
    const [selectedGifts, setSelectedGifts] = useState([]);
    const [budgetLeft, setBudgetLeft] = useState(null);
    const numberOfGifts = selectedGifts ? selectedGifts.length : 0;
    const [giftIDEmpty, setGiftIDEmpty] = useState(false);

    useEffect(() => {
        AsyncStorage.getItem("budgetCards")
            .then((budgetCardsJson) => {
                const budgetCards = JSON.parse(budgetCardsJson);
                const budgetCardBeingEdited = budgetCards.find(card => card.props.budgetCardId === selectCard.budgetCardId);
                const person = PERSONS.find(person => person.name === budgetCardBeingEdited.props.name);
                setSelectedPerson(person);
                setSelectedEvent(budgetCardBeingEdited.props.event)
                setTitle(budgetCardBeingEdited.props.title)
                setBudget(budgetCardBeingEdited.props.budget)
                setSelectedPersons(budgetCardBeingEdited.props.names.split(', ').map(name => ({ name })))          
                setSelectedGifts(budgetCardBeingEdited.props.gifts);
                if (budgetCardBeingEdited.props.giftID === '') {
                    setGiftIDEmpty(true);
                }
                if (budgetCardBeingEdited.props.numberOfGifts === 0) {
                    setGiftIDEmpty(true);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, [budgetCard]);

    useEffect(() => {
        if (giftIDEmpty) {
            setBudgetLeft(budgetState)
        } else {
            const sum = selectedGifts && selectedGifts.reduce((acc, gift) => acc + gift._price, 0);
            const parsedSum = parseFloat(sum).toFixed(2);
            setBudgetLeft((budgetState - sum).toFixed(2));
        }
    }, [selectedGifts, budgetState, giftIDEmpty]);

    useEffect(() => {
        setGiftID(giftIdProp);
    }, []);

    const pickerValues = PERSONS.map(person => person.name);
    const pickerEventValues = EVENTS.map((event) => event._name);

    const saveHandler = () => {
        if (selectedPersons.length === 0) {
            alert("Select at least one person!");
            return;
        }
        if (isNaN(parseFloat(budgetState))) {
            alert("Budget must be a number!");
            return;
        }
        const updatedBudgetCards = budgetCards.map(card => {
            if (card.props.budgetCardId === selectCard.budgetCardId) {
                return (
                    <BudgetCard
                        person={selectedPerson}
                        event={selectedEvent}
                        title={titleState}
                        names={selectedPersons.map(person => person.name).join(', ')}
                        budget={budgetState}
                        budgetCardId={card.props.budgetCardId}
                        giftID={giftIdState}
                        gifts={selectedGifts}
                        budgetLeft={budgetLeft}
                        numberOfGifts={numberOfGifts}
                    />
                );
            }
            return card;
        });
        setBudgetCards(updatedBudgetCards);
        setShowEditModal(false);
        saveBudgetCards(updatedBudgetCards);
    };

    function cancelHandler() {
        setShowEditModal(false);
    }


    return (
        <View style={{ alignItems: "flex-start", justifyContent: "flex-start", marginBottom: 20 }}>
            <Modal animationType="slide" visible={visible} transparent={false}>
                <View style={styles.headerContainer}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity onPress={cancelHandler} style={{ marginLeft: 10, alignSelf: 'flex-start' }}>
                            <AntDesign name="arrowleft" size={24} color="black" />
                        </TouchableOpacity>
                        <Text style={{ width: 0, flex: 1, textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}> Edit a Card!</Text>
                        <TouchableOpacity style={styles.saveButton} onPress={saveHandler}>
                            <Ionicons name="save-outline" size={24} color={"white"} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.container}>
                    <View style={styles.textContainer}>
                        <Text style={[styles.label]}>Edit Title here:</Text>
                        <TextInput
                            value={titleState}
                            placeholder="Enter your title"
                            placeholderTextColor="white"
                            style={styles.input}
                            onChangeText={(value) => setTitle(value)}
                            color="white"
                        />
                            <PickerPersonInputField
                                label="Add a Person here:"
                                selectedValue={selectedPersons.map(person => person.name)}
                                onValueChange={(itemValue) => {
                                    const selectedPerson = PERSONS.find(person => person.name === itemValue);
                                    setSelectedPersons([...selectedPersons, selectedPerson]);
                                }}
                                arrayOfValues={pickerValues.filter(value => !selectedPersons.map(person => person.name).includes(value))}
                                mode="multiple"
                            />

                            {selectedPersons.length > 0 ?
                                selectedPersons.map((person, index) => (
                                    <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={[styles.selectedPersons, { flex: 1, textAlign: 'center' }]}>{person.name}</Text>
                                        <View>
                                            <TouchableOpacity onPress={() => {
                                                const updatedSelectedPersons = selectedPersons.filter(p => p.name !== person.name);
                                                setSelectedPersons(updatedSelectedPersons);
                                            }}>
                                                <Ionicons name="trash-outline" size={20} color='white' />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                ))
                                : null
                            }

                        <PickerEventInputField
                            label="Edit Event here:"
                            setValue={setSelectedEvent}
                            selectedValue={selectedEvent ? selectedEvent:''}
                            onValueChange={(itemValue) => setSelectedEvent(itemValue)}
                            arrayOfValues={pickerEventValues}

                        />
                        <Text style={[styles.label]}>Edit Budget here:</Text>
                        <TextInput
                            placeholder="Edit your budget"
                            placeholderTextColor="white"
                            keyboardType="numeric"
                            style={styles.input}
                            onChangeText={(value) => setBudget(value)}
                            color="white"
                            value={budgetState.toString()}                       
                        />
                    </View>
                </View>
            </Modal>
            {budgetCard}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary500,
    },
    selectedPersons: {
        color: 'white',
        textAlign: 'center',
    },
    input: {
        backgroundColor: Colors.primary400,
        placeholderTextColor: 'white',
        color: 'white',
        padding: 6,
        borderRadius: 6,
        fontSize: 16,
        width: '98%',
        alignSelf: 'center',
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
    closeButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        zIndex: 1,
    },
    saveButton: {
        borderRadius: 18,
        backgroundColor: Colors.primary400,
        padding: 6,
        elevation: 3,
    },
    headerContainer: {
        backgroundColor: Colors.accent500,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
    },
    label: {
        fontSize: 16,
        color: Colors.accent300,
        marginLeft: '1%',
        marginBottom: 4,
    },
    textContainer: {
        backgroundColor: Colors.primary500,
        flex: 1,
        marginTop: 10,
    },
});
export default EditBudgetModal;
