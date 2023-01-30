import { StatusBar } from "expo-status-bar";
import {View, StyleSheet, ScrollView, Alert} from "react-native";
import React, {useContext, useEffect, useState} from "react";
import {useFocusEffect} from "@react-navigation/native";

import AddButton from "../components/AddButton";
import PersonCard from '../components/PersonCard';
import Colors from "../constants/colors";
import {PersonsContext} from "../store/PersonsContext";
import {deleteConfirmationAlert} from "../components/deleteConfirmationAlert";
import FilterButton from "../components/FilterButton";
import {Person} from "../models/Person";
import * as Contacts from "expo-contacts";
import {Contact} from "../models/Contact";
import { AssignmentContext } from "../store/AssignmentContext";
import tabBarAttributes from "../constants/tabBarAttributes";

const PersonOverviewScreen = (props) => {
    const personsContext = useContext(PersonsContext);
    const assignmentContext = useContext(AssignmentContext);
    const personsArray = personsContext.persons;

    const AddButtonHandler = () => {
        const allContactsJson = JSON.stringify(allContacts);
        Alert.alert(
            "Add Person", "How do you want to add a new person?",
            [{text: "Cancel", onPress: () => { }, style: "cancel"},
                    {text: "Manually", onPress: () => props.navigation.navigate('Person Details')},
                     {text: "Import from Contacts", onPress: () => {
                         props.navigation.navigate('Contact Selection',
                                 {contacts: allContactsJson})
                         }}]
        );
    }

    const [allContacts, setAllContacts] = useState([]);

    useEffect(
        React.useCallback(() => {
            if (props.route.params?.selection) {
                const importedContact = Contact.fromJson(props.route.params.selection.contactJson);
                const importedPerson = new Person (importedContact.name, importedContact.birthday, null, importedContact.image);
                const importedPersonJson = JSON.stringify(importedPerson);
                props.route.params.selection = null;
                props.navigation.navigate('Person Details', {selectedContact: importedPersonJson});
            }
        }, [props.route.params?.selection])
    );
    useFocusEffect(
        React.useCallback(() => {
            const tabNavigator = props.navigation.getParent();
                 tabNavigator.setOptions({
                     headerRight: () => <AddButton onPress={AddButtonHandler} />,
                     headerShown: true,
                     ...tabBarAttributes
                 });
        }, [AddButtonHandler, AddButton, props.navigation])
    );

    const personSelected = (person) => {
        const personKey = person.key;
        props.navigation.navigate('Person Details', {personKey: personKey});
    }

    const personLongPressed = (person) => {
        deleteConfirmationAlert(person, deletePerson, person.name, 'person');
    }

    const deletePerson = (person) => {
        const key = person.key;
        personsContext.removePerson(person);
        const assignmentsToDelete = assignmentContext.assignments.filter((element) => {
            return element._person === key;
        })
        assignmentsToDelete.forEach((element) => {
            assignmentContext.removeAssignment(element);
         })
    }

    const PersonsSorted = personsArray.sort((a, b) => a.name.localeCompare(b.name));

    const [selectedCategory, selectCategory] = useState("all");
    const categoriesToFilter = [...new Set(PersonsSorted.map((person) => person.category))];
    categoriesToFilter.unshift("all");
    const filterCallback = (category) => {
        selectCategory(category);
    }
    const filterButtons = categoriesToFilter.map( (category, index) => {
        return(
            <FilterButton text={category} selectedIndex={selectedCategory} id={category} callback={filterCallback} key={index}>
            </FilterButton>
        );
    });

    const PersonsFiltered = PersonsSorted.filter( (person, index) => {
        return selectedCategory === "all" || selectedCategory === person.category;
    })

    const PersonsToDisplay = PersonsFiltered.map( (person, index) => {
        return(
            <PersonCard
                person={person}
                onSelect={personSelected}
                onLongPress={personLongPressed}
                key={index}
            />
        );
    });

    useEffect(() => {
        (async () => {
            const { status } = await Contacts.requestPermissionsAsync();
            if (status === 'granted') {
                const { data } = await Contacts.getContactsAsync(
                );

                if (data.length > 0) {
                    setAllContacts(data);
                } else {
                    console.log("no contacts");
                }
            }
        })();
    }, []);

    return (
        <View style={styles.container}>

            <View style={styles.filterBar}>
                <ScrollView contentContainerStyle={styles.filterContainer} horizontal={true} showsHorizontalScrollIndicator={false} >
                    {filterButtons}
                </ScrollView>
            </View>

            <ScrollView contentContainerStyle={styles.cardsContainer}>
                {PersonsToDisplay}
            </ScrollView>

            <StatusBar style="auto" />

        </View>

    );
}

export default PersonOverviewScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.primary500,
        height: '100%',
        alignItems: "flex-start",
        justifyContent: "flex-start",
    },
    filterBar: {
        backgroundColor: Colors.primary500,
        paddingBottom: 10,
        paddingTop: 5,
        width: '100%',
    },
    cardsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width:'100%',
        paddingBottom: 20,
    },
    filterContainer: {
        flexDirection: 'row',
    },
    TabBar: {
        backgroundColor: Colors.primary500,
    },
});
