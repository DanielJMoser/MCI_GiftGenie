import { useLayoutEffect, useEffect, useState } from "react";
import { View, TextInput, Button, Text, StyleSheet, Modal } from 'react-native';
import Colors from "../constants/colors";
import { PERSONS } from "../data/PersonData";
import { EVENTS } from "../data/EventData";
import PickerPersonInputField from "./BudgetPickerInputField";
import PickerEventInputField from "./BudgetEventPickerInputField";
import BudgetCard from "./BudgetCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { v1 as uuidv1 } from 'uuid';

//import { saveBudgetCards } from "../screens/BudgetScreen"

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


const EditBudgetModal = ({ budgetCards, setBudgetCards, selectedCard, setSelectedCard, budgetCard, giftIdProp, person, setShowEditModal, visible }) => {
    const selectCard = budgetCards[selectedCard].props
    const [budgetState, setBudget] = useState(selectCard.budget);
    const [giftIdState, setGiftID] = useState(giftIdProp);
    const namesArray = selectCard.names.split(", ");
    const [selectedPersons, setSelectedPersons] = useState(namesArray.map(name => ({ name })));
    const [titleState, setTitle] = useState(null);
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [availableValues, setAvailableValues] = useState(pickerValues);



    useLayoutEffect(() => {
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
                console.log("BUDGETCARDBEINGEDITED.PROPS.NAMES", budgetCardBeingEdited.props.names)
                console.log("BUDGETCARDBEINGEDITED.PROPS",budgetCardBeingEdited.props)
            })
            .catch((error) => {
                console.error(error);
            });
    }, [budgetCard]);


    useEffect(() => {
        //setTitle(selectCard.title);
        //setSelectedPerson(selectCard.person);
        //setBudget(selectCard.budget);
        setGiftID(giftIdProp);
    }, []);

    const pickerValues = PERSONS.map(person => person.name);
    const pickerEventValues = EVENTS.map((event) => event._name);

    const saveHandler = () => {
        const names = selectedPersons.map(person => person.name).join(', ');
        const budgetCardId = uuidv1();
        const personKeys = selectedPersons.map(person => person._key);
        const newBudgetCard = (
            <BudgetCard
                person={selectedPerson}
                personKeys={personKeys}
                event={selectedEvent}
                title={titleState}
                names={names}
                budget={budgetState}
                budgetCardId={budgetCardId}
                giftID={giftIdState}
            />
        );
        const updatedBudgetCards = budgetCards.map((card, index) => index === selectedCard ? newBudgetCard : card);
        setBudgetCards(updatedBudgetCards);
        setShowEditModal(false);
        saveBudgetCards(updatedBudgetCards);
    };


    function cancelHandler() {
        console.log("Cancel");
        setShowEditModal(false);
    }
    const removePerson = (person) => {
        setSelectedPersons(selectedPersons.filter(p => p !== person));
        setAvailableValues([...availableValues, person.name]);
    }


    return (
        console.log('selectedPersons:', selectedPersons),
        <View>
            <Modal animationType="slide" visible={visible} transparent={false}>
                <View style={styles.container}>
                    <View style={styles.textContainer}>
                        <TextInput
                            value={titleState}
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
                                arrayOfValues={pickerValues.filter(value => !selectedPersons.map(person => person.name).includes(value))}
                                mode="multiple"
                            />

                            {selectedPersons.length > 0 ?
                                selectedPersons.map((person, index) => (
                                    <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text>{person.name}</Text>
                                        <View>
                                            <TouchableOpacity onPress={() => {
                                                const updatedSelectedPersons = selectedPersons.filter(p => p.name !== person.name);
                                                setSelectedPersons(updatedSelectedPersons);
                                            }}>
                                                <Ionicons name="trash-outline" size={20} />
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
                        <Text style={[styles.label, { color: Colors.accent300, fontSize: 16 }]}>Edit Budget here:</Text>
                        <TextInput
                            placeholder="Edit your budget"
                            placeholderTextColor="primary500"
                            keyboardType="numeric"
                            style={styles.input}
                            onChangeText={(value) => setBudget(value)}
                            color="primary500"

                            value={budgetState}
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
            {budgetCard}
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
export default EditBudgetModal;
