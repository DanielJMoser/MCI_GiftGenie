import React, {useState, useEffect, useContext} from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import BudgetGiftPickerInputField from './BudgetGiftPickerInputField'
import BudgetCard from './BudgetCard';
import { AntDesign } from '@expo/vector-icons'; 
import Colors from '../constants/colors';
import { Alert } from 'react-native';
import {PresentsContext} from "../store/PresentsContext";
import {PersonsContext} from "../store/PersonsContext";

const BudgetGiftModal = ({ setBudgetCards, saveBudgetCards, budgetCards, cancelHandler, visible, showGiftModal, setShowGiftModal, budgetCardId, onClose }) => {
    const presentsCtx = useContext(PresentsContext);
    const PRESENTS = presentsCtx.presents;
    const personsCtx = useContext(PersonsContext);
    const PERSONS = personsCtx.persons;
    const [budgetCard, setBudgetCard] = useState();
    const [selectedGift, setSelectedGift] = useState(null);
    const [selectedGifts, setSelectedGifts] = useState([]);
    const [selectedPerson, setSelectedPerson] = useState(null);
    const pickerGiftValues = PRESENTS.map((gift) => gift._name);
    const [namesArray, setNamesArray] = useState([]);
    const isMultipleNames = namesArray.length > 1;
    const [budgetLeft, setBudgetLeft] = useState(0);
    const [budgetAssigned, setBudgetAssigned] = useState();
    const [budgetLeftIsNegative, setBudgetLeftIsNegative] = useState(false);
    const [budgetLeftUpdated, setBudgetLeftUpdated] = useState(0);


    function cancelHandler() {
        setShowGiftModal(false);
    }
    useEffect(() => {
        AsyncStorage.getItem("budgetCards")
            .then((budgetCardsJson) => {
                const budgetCards = JSON.parse(budgetCardsJson);
                const budgetCardBeingEdited = budgetCards.find(card => card.props.budgetCardId === budgetCardId);
                const person = PERSONS.find(person => person.name === budgetCardBeingEdited.props.name);
                const namesArray = budgetCardBeingEdited.props.names.split(",");
                setNamesArray(namesArray)
                setSelectedPerson(person);
                if (budgetCardBeingEdited.props.gifts){
                    setSelectedGifts(budgetCardBeingEdited.props.gifts);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);


    const retrieveBudgetCards = async () => {
        try {
            const budgetCardsJson = await AsyncStorage.getItem("budgetCards");
            let budgetCards = [];
            if (budgetCardsJson) {
                budgetCards = JSON.parse(budgetCardsJson);
            }
            setBudgetCards(budgetCards);
            return budgetCards;
        } catch (error) {
            console.error(error);
        }
    };


    useEffect(() => {
        if (budgetCard && budgetCard.props) {
            const budgetLeft = (parseFloat(budgetCard.props.budget) - selectedGifts.reduce((prev, curr) => prev + curr._price, 0)).toFixed(2);
            if (budgetLeft < 0) {
                setBudgetLeftIsNegative(true);
            } else {
                setBudgetLeftIsNegative(false);
            }
        }
    }, [selectedGifts]);


    const saveHandler = async () => {
        const giftKeys = selectedGifts.map(gift => gift._key);
        let budgetLeft = (parseFloat(budgetCard.props.budget) - selectedGifts.reduce((prev, curr) => prev + curr._price, 0)).toFixed(2);
        const totalCost = (parseFloat(selectedGifts.reduce((prev, curr) => prev + curr._price, 0)).toFixed(2));
        setBudgetLeftUpdated(totalCost);
        setBudgetLeftIsNegative(budgetLeft < 0)
        let budgetAssigned = budgetCard.props.budget;
        if (budgetLeft < 0) {
            budgetAssigned = parseFloat(addMissingBudget(budgetAssigned));
            budgetLeft = ((parseFloat(budgetAssigned) - totalCost).toFixed(2));
        }
        const numberOfGifts = selectedGifts.length;
        const updatedBudgetCards = budgetCards.map(card => {
            if (card.props.budgetCardId === budgetCardId) {
                return <BudgetCard {...card.props} budget={budgetAssigned} budgetLeft={budgetLeft} numberOfGifts={numberOfGifts} giftID={giftKeys} gifts={selectedGifts} />;            }
            return card;
        });
        try {
            setBudgetCards(updatedBudgetCards);
            await AsyncStorage.setItem("budgetCards", JSON.stringify(updatedBudgetCards));
        } catch (error) {
            console.error(error);
        }        
        setBudgetCards(updatedBudgetCards);
        setShowGiftModal(false);
        saveBudgetCards(updatedBudgetCards);
        onClose();
    };


    useEffect(() => {
        const retrieveBudget = async () => {
            const retrievedBudgetCards = await retrieveBudgetCards();
            const budgetCard = retrievedBudgetCards.find(card => card.props.budgetCardId === budgetCardId);
            setBudgetCard(budgetCard);
        };
        retrieveBudget();
    }, []);

    useEffect(() => {
        if (budgetCard && budgetCard.props) {
            const budgetLeft = (parseFloat(budgetCard.props.budget) - selectedGifts.reduce((prev, curr) => prev + curr._price, 0)).toFixed(2);
            if (budgetLeft < 0) {
                Alert.alert(
                    'Budget exceeded',
                    'Would you like to add the missing budget to this card?',
                    [
                        { text: 'Yes', onPress: saveHandler },
                        { text: 'No', onPress: () => { } }
                    ],
                    { cancelable: false },
                );
            }
        }
    }, [selectedGifts])

    const addMissingBudget = () => {
        const budgetLeft = (parseFloat(budgetCard.props.budget) - selectedGifts.reduce((prev, curr) => prev + curr._price, 0));
        const missingBudget = (parseFloat((budgetLeft * -1)));
        const newBudget = (missingBudget + parseFloat(budgetCard.props.budget)).toFixed(2);
        return newBudget
    }

    return (
        <Modal visible={visible} animationType="slide">
            <View style={styles.modalContainer}>
                <View style={styles.headerContainer}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity onPress={cancelHandler} style={{ marginLeft: 10, alignSelf: 'flex-start' }}>
                            <AntDesign name="arrowleft" size={24} color="black" />
                        </TouchableOpacity>
                        <Text style={{ width: 0, flex: 1, textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}> Assign Gifts!</Text>
                        <TouchableOpacity style={styles.saveButton} onPress={saveHandler}>
                            <Ionicons name="save-outline" size={24} color={"white"} />
                        </TouchableOpacity>
                    </View>
                </View>

                
                {budgetCard && <Text style={styles.eventStyle}>{budgetCard.props.event}</Text>}
                    {budgetCard && <Text style={styles.titleStyle}>{budgetCard.props.title}</Text>}
                    {budgetCard && <Text style={{ ...styles.personsStyle, fontWeight: "bold" }}>{isMultipleNames ? "Persons: " : "Person: "} </Text>}    
                    {budgetCard && <Text style={{ ...styles.personsStyle }}> {budgetCard.props.names} </Text>}
 

                

                <View style={styles.budgetContainer}>
                        {budgetCard && <Text style={styles.budgetText}>Assigned Budget: {budgetCard.props.budget}€</Text>}
                    {budgetCard && <Text style={[styles.budgetText, { color: (parseFloat(budgetCard.props.budget) - selectedGifts.reduce((prev, curr) => prev + curr._price, 0) < 0) ? "red" : Colors.accent300 }]}>
                    Budget Left: {(parseFloat(budgetCard.props.budget) - selectedGifts.reduce((prev, curr) => prev + curr._price, 0)).toFixed(2)}€ </Text>}
                </View>

                <View style={styles.labelContainer}>
                    <Text style={styles.label}>Add your Gifts here:</Text>
                </View>
                <View style={styles.pickerContainer}>
                    <BudgetGiftPickerInputField
                        setValue={setSelectedGift}
                        selectedValue={selectedGift ? selectedGift : ''}
                        onValueChange={(itemValue) => {
                            const selectedGift = PRESENTS.find(gift => gift._name === itemValue);
                            setSelectedGifts(prevGifts => [...prevGifts, selectedGift]);
                        }}
                        arrayOfValues={pickerGiftValues.filter(value => !selectedGifts.map(gift => gift._name).includes(value))}
                        mode="multiple"
                    />
                </View>
                {selectedGifts.length > 0 ?
                    selectedGifts.map((gift, index) => (
                        <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={[styles.selectedGifts, { flex: 1, textAlign: 'center' }]}>{gift._name} {gift._price}€</Text>
                            <View>
                                <TouchableOpacity onPress={() => {
                                    const updatedSelectedGifts = selectedGifts.filter(g => g._name !== gift._name);
                                    setSelectedGifts(updatedSelectedGifts);
                                }}>
                                    <Ionicons name="trash-outline" size={20} color= 'white' />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))
                    : null
                }
            </View>
        </Modal>
    );


};

const styles = StyleSheet.create({
    selectedGifts: {
        color: 'white',
        alignSelf: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: Colors.primary500,
        flex: 1,
    },
    headerContainer: {
        backgroundColor: Colors.accent500,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
    },
    title: {
        marginLeft: 20,
        marginTop: 20,
        fontSize: 20,
        color: 'white',
    },
    button: {
        marginTop: 35,
        alignSelf: 'center',
        color: Colors.accent500
    },
    eventStyle: {
        color: Colors.accent500,
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20
    },
    titleStyle: {
        color: Colors.accent300,
        fontSize: 20,
        textAlign: 'center',
        marginTop: 10
    },
    personsStyle: {
        color: Colors.accent300,
        fontSize: 15,
        textAlign: 'center',
        marginTop: 10
    },
    budgetContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        marginTop: 20
    },
    budgetText: {
        color: Colors.accent300,
        fontSize: 15,
        marginHorizontal: 10
    },
    pickerContainer: {
        width: '98%',
        alignSelf: 'center',
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 150
    },
    saveButton: {
        borderRadius: 18,
        backgroundColor: Colors.primary400,
        padding: 6,
        elevation: 3,
    },
    labelContainer: {
        marginTop: "15%",
        alignSelf: 'center',
        marginBottom: -30,
    },
    label: {
        fontSize: 16,
        color: Colors.accent300,
    },
});

export default BudgetGiftModal;
