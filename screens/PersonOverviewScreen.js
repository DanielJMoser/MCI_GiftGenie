import { StatusBar } from "expo-status-bar";
import {View, StyleSheet, ScrollView} from "react-native";
import React, {useContext, useState} from "react";
import {useFocusEffect} from "@react-navigation/native";

import AddButton from "../components/AddButton";
import PersonCard from '../components/PersonCard';
import Colors from "../constants/colors";
import {PersonsContext} from "../store/PersonsContext";
import {deleteConfirmationAlert} from "../components/deleteConfirmationAlert";
import FilterButton from "../components/FilterButton";

const PersonOverviewScreen = (props) => {
    const personsContext = useContext(PersonsContext);
    const personsArray = personsContext.persons;
    const AddButtonHandler = () => {
        props.navigation.navigate('Person Details');
    }

    useFocusEffect(
        React.useCallback(() => {
            const tabNavigator = props.navigation.getParent();
                 tabNavigator.setOptions({
                     headerRight: () => <AddButton onPress={AddButtonHandler} />,
                     headerShown: true
                 });
        }, [AddButtonHandler, AddButton, props.navigation])
    );

    const personSelected = (person) => {
        const personKey = person.key;
        props.navigation.navigate('Person Details', {personKey: personKey});
    }

    const getPerson = (key) => {
        const Index = personsContext.persons.findIndex((element) => element.key === key);
        return Index !== -1 ? personsContext.persons[Index] : null;
    }

    const personLongPressed = (person) => {
        deleteConfirmationAlert(person, deletePerson, person.name, 'person');
    }

    const deletePerson = (person) => {
        personsContext.removePerson(person);
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
    }
});
