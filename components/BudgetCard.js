import React from 'react';
import { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import Colors from "../constants/colors";
import { GIFTASSIGNMENTS } from "../data/GiftAssignmentData";
import { GESCHENKE } from '../data/GeschenkData';
import { PERSONS } from '../data/PersonData';


const getNumberOfGiftsForPerson = (personKey) => {
    const giftsForPerson = GIFTASSIGNMENTS.filter(
        (assignment) => assignment._person._key === personKey
    );

    const numGifts = giftsForPerson.reduce((acc, assignment) => {
        return acc + 1;
    }, 0);

    return numGifts;
}


const getTotalGiftPriceForPerson = (personKey) => {
    const giftsForPerson = GIFTASSIGNMENTS.filter(
        (assignment) => assignment._person._key === personKey
    );

    const totalPrice = giftsForPerson.reduce((acc, assignment) => {
        const gift = GESCHENKE.find((item) => item._key === assignment._gift._key);
        if (gift) {
            acc += gift._price;
        }
        return acc;
    }, 0);
    return totalPrice;
};

export const getTotalGiftPrice = () => {
    let sumOfAllGiftPrices = 0;
    GIFTASSIGNMENTS.forEach((assignment) => {
        const gift = GESCHENKE.find((item) => item._key === assignment._gift._key);
        if (gift) {
            sumOfAllGiftPrices += gift._price;
        }

    });

    return sumOfAllGiftPrices;
};


const BudgetCard = ({ personKey, deleteHandler, setBudgetCards, setSelectedCard, setShowEditModal, giftID, event, style, title, names, budget, index }) => {
    // const [showEditModal, setShowEditModal] = useState(false);
    const person = PERSONS.find(person => person._key === personKey)
    const gift = GESCHENKE.find((item) => item._key === giftID);
    const totalGiftPrice = getTotalGiftPriceForPerson(personKey, GIFTASSIGNMENTS, GESCHENKE);
    const totalGiftAmount = getNumberOfGiftsForPerson(personKey, GIFTASSIGNMENTS, GESCHENKE);
    const sumOfAllPrices = getTotalGiftPrice();
    return (
        <View>
            <TouchableOpacity
                style={{ ...styles.screen, ...style }}
                onLongPress={() => {
                    setSelectedCard(index ? index : 0);
                    setShowEditModal(true);
                }}
            >
                <View style={{ margin: 10 }}>
                        <View style={{ ...styles.eventItem, height: 100, width: 300, paddingTop: 10 }}>
                        <Text style={styles.text}>{title}</Text>   
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Text style={styles.text}>{event}: {names}</Text>                          
                            <Ionicons
                                style={styles.icon}
                                name="trash-outline"
                                size={22}
                                color="white"
                                onPress={async () => {
                                    let newCards = await deleteHandler(index)
                                    // newCards=newCards.filter(card => card.props.index!= index)
                                    setBudgetCards(newCards)
                                }}
                            />
                        </View>
                        <View style={{ flexDirection: "row", marginTop: 10 }}>
                            <Ionicons
                                style={styles.icon}
                                name="gift-outline"
                                size={24}
                                color="white"
                            />
                            <Text style={styles.counts}> {totalGiftAmount} </Text>
                            <Ionicons
                                style={styles.icon}
                                name="cash-outline"
                                size={24}
                                color="white"
                            />
                            <Text style={styles.counts}>Budget Left: {budget}€</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
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
    counts: {
        color: "white",
        fontSize: 16,
        paddingTop: 3,
    },
});

export default BudgetCard;