import React, {useContext} from 'react';
import { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import Colors from "../constants/colors";
import BudgetGiftModal from "./BudgetGiftModal";
import AsyncStorage from '@react-native-async-storage/async-storage';

import {PersonsContext} from "../store/PersonsContext";
import {PresentsContext} from "../store/PresentsContext";
import {AssignmentContext} from "../store/AssignmentContext";


const getNumberOfGiftsForPerson = (personKey, GIFTASSIGNMENTS, PRESENTS) => {
    const giftsForPerson = GIFTASSIGNMENTS.filter(
        (assignment) => assignment._person === personKey
    );

    const numGifts = giftsForPerson.reduce((acc, assignment) => {
        return acc + 1;
    }, 0);

    return numGifts;
}


const getTotalGiftPriceForPerson = (personKey, GIFTASSIGNMENTS, PRESENTS) => {
    const giftsForPerson = GIFTASSIGNMENTS.filter(
        (assignment) => assignment._person === personKey
    );

    const totalPrice = giftsForPerson.reduce((acc, assignment) => {
        const gift = PRESENTS.find((item) => item._key === assignment._gift);
        if (gift) {
            acc += gift._price;
        }
        return acc;
    }, 0);
    return totalPrice;
};

export const getTotalGiftPrice = (GIFTASSIGNMENTS, PRESENTS) => {
    let sumOfAllGiftPrices = 0;
    GIFTASSIGNMENTS.forEach((assignment) => {
        const gift = PRESENTS.find((item) => item._key === assignment._gift);
        if (gift) {
            sumOfAllGiftPrices += gift._price;
        }

    });

    return sumOfAllGiftPrices;
};


const BudgetCard = ({ fetchData, budgetCardId, personKey, deleteHandler, setSelectedCard, setShowEditModal, giftID, event, style, title, names, budget, index, numberOfGifts, budgetLeft, callback }) => {
    const personsCtx = useContext(PersonsContext);
    const presentsCtx = useContext(PresentsContext);
    const assignmentsCtx = useContext(AssignmentContext);
    const [budgetCards, setBudgetCards] = useState([]);
    const [showGiftModal, setShowGiftModal] = useState(false);
    const [selectedBudgetCardId, setSelectedBudgetCardId] = useState(null);
    const totalGiftPrice = getTotalGiftPriceForPerson(personKey, assignmentsCtx.assignments, presentsCtx.presents);
    const totalGiftAmount = getNumberOfGiftsForPerson(personKey, assignmentsCtx.assignments, presentsCtx.presents);
    const sumOfAllPrices = getTotalGiftPrice(assignmentsCtx.assignments, presentsCtx.presents);
    const [namesArray, setNamesArray] = useState([]);

    useEffect(() => {
        setNamesArray(names.split(", "));
    }, []);

    const handleOpenGiftModal = (budgetCardId) => {
        setSelectedBudgetCardId(budgetCardId);
        setShowGiftModal(true);
    }

    const handleSave = (updatedCards) => {
        fetchData();
    }

    const saveBudgetCards = async (updatedCards) => {
        try {
            await AsyncStorage.setItem("budgetCards", JSON.stringify(updatedCards));
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <View>
            <TouchableOpacity
                style={{ ...styles.screen, ...style }}
                onPress={() => handleOpenGiftModal(budgetCardId)}
                onLongPress={() => {
                    setSelectedCard(index ? index : 0);
                    setShowEditModal(true);
                }}
            >
                    <View style={{ margin: 10 }}>
                        <View style={{ ...styles.eventItem, height: 140 + (namesArray.length * 21), paddingTop: 10 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Text style={{ ...styles.text, textAlign: 'left', color: Colors.accent500, fontWeight: 'bold', fontSize: 18 }}>{title}</Text>
                                <Text style={{ ...styles.text, textAlign: 'right', color: Colors.accent500, fontWeight: 'bold', fontSize: 18 }}>{event}</Text>
                            </View>

                            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
                                <View>
                                    <Text style={{ ...styles.text, fontWeight: 'bold'}}>{namesArray.length === 1 ? "Person: " : "Persons: "}</Text>
                                    {namesArray.map((name, index) => (
                                        <Text key={index} style={styles.text}>{name}</Text>
                                    ))}
                                </View>
                            </View>
                        <View style={{ flexDirection: "row", marginTop: 10 }}>
                            <Ionicons
                                style={styles.icon}
                                name="gift-outline"
                                size={24}
                                color="white"
                            />
                            <Text style={styles.counts}> {numberOfGifts || 0} </Text>
                            <Ionicons
                                style={styles.icon}
                                name="cash-outline"
                                size={24}
                                color="white"
                            />
                            <Text style={styles.counts}> Unused Budget: 
                                <Text style={budgetLeft < 0 ? styles.red : styles.counts}> {budgetLeft || budget}</Text>€</Text>
                        </View>
                        <View style={{ alignItems: 'center', marginTop: 5 }}>
                            <Ionicons
                                style={styles.icon}
                                name="trash-outline"
                                size={22}
                                color="white"
                                onPress={async () => {
                                    let newCards = await deleteHandler(index)
                                    setBudgetCards(newCards)
                                }}
                            />
                        </View>

                    </View>
                </View>
            </TouchableOpacity>
            {showGiftModal && (
                <BudgetGiftModal
                    callback={() => callback()}
                    setBudgetCards={setBudgetCards}
                    saveBudgetCards={saveBudgetCards}
                    budgetCards={budgetCards}
                    visible={showGiftModal}
                    showGiftModal={showGiftModal}
                    setShowGiftModal={setShowGiftModal}
                    budgetCardId={selectedBudgetCardId}
                    onClose={handleSave}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItem: "center",
        justifyContent: "center",
        backgroundColor: Colors.primary500,
    },
    eventItem: {
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "white",
        height: 75,
        backgroundColor: Colors.primary400,
    },
    text: {
        color: "white",
        fontSize: 16,
    },
    icon: {
        marginLeft: 20,
    },
    red: {
        color: 'red',
        fontSize: 16,
    },
    counts: {
        color: "white",
        fontSize: 16,
        paddingTop: 3,
    },
});

export default BudgetCard;