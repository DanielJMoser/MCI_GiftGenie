import React, {useContext} from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import ProgressiveImage from "./ProgressiveImage";

import Colors from "../constants/colors";
import Ionicons from "react-native-vector-icons/Ionicons";
import {AssignmentContext} from "../store/AssignmentContext";

const defaultImage = '../assets/default-person-image.png';

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

const PersonCard = (props) => {
    const assignmentContext = useContext(AssignmentContext);
    const assignments = assignmentContext.assignments;
    const person = props.person;

    const numberOfGifts = (assignments, personKey) => {
        const theseGifts = assignments.filter(
            (assignment) => assignment._person === personKey
        );
        const unique = theseGifts
            .map((assignment) => assignment._gift)
            .filter(onlyUnique);
        return unique.length;
    };
    const numberOfEvents = (assignments, personKey) => {
        const theseEvents = assignments.filter(
            (assignment) => assignment._person === personKey
        );
        const unique = theseEvents
            .map((assignment) => assignment._event)
            .filter(onlyUnique);
        return unique.length;
    };

    return (
        <TouchableOpacity
            style={ {...styles.cardContainer, ...props.style} }
            onPress={() => props.onSelect(person)}
            onLongPress={() => props.onLongPress(person)}
        >
            <ProgressiveImage style={styles.image}
                              uri={person.image}
                              defaultSource={require(defaultImage)}
                              resizeMode={'contain'}
            />
            <View style={styles.textContainer}>
                <Text
                    numberOfLines={2}
                    adjustsFontSizeToFit
                    style={styles.personText}
                >{person.name}
                </Text>
            </View>
            <View style={styles.infoContainer}>
                <View style={styles.infoCard}>
                    <Ionicons
                        style={styles.icon}
                        name="gift-outline"
                        size={24}
                        color="black"
                    />
                    <Text style={styles.infoText}> {numberOfGifts(assignments, person.key)} </Text>
                </View>
                <View style={styles.infoCard}>
                    <Ionicons
                        style={styles.icon}
                        name="calendar-outline"
                        size={24}
                        color="black"
                    />
                    <Text style={styles.infoText}> {numberOfEvents(assignments, person.key)} </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        height: 210,
        width: '42.5%',
        backgroundColor: Colors.primary500,
        elevation: 10,
        marginLeft: '5%',
        marginTop: '5%',
    },
    personText: {
        textAlign: 'center',
        color: 'black',
        fontSize: 20
    },
    image: {
        height: 150,
        width: '100%',

    },
    textContainer: {
        justifyContent: 'center',
        height: 40,
        width: '100%',
        backgroundColor: Colors.accent500,
    },
    infoContainer: {
        justifyContent: 'center',
        flexDirection: "row",
        backgroundColor: Colors.accent500,
        borderTopColor: Colors.accent300,
        borderTopWidth: 1
    },
    infoCard: {
        flexDirection: "row",
        marginHorizontal: 10,
    },
    infoText: {
        color: "black",
        fontSize: 16,
        paddingTop: 3,
        marginHorizontal: 2,
    }
});

export default PersonCard;