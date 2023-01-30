import { StatusBar } from "expo-status-bar";
import {View, StyleSheet, ScrollView, Text, Platform} from "react-native";
import React, {useLayoutEffect} from "react";
import Colors from "../constants/colors";
import {Contact} from "../models/Contact";
import ContactCard from "../components/ContactCard";


const ContactSelectionScreen = ({route, navigation}) => {
    const contactsJson = JSON.parse(route.params?.contacts);
    const contacts = contactsJson.map( (element, index) => {
        const birthday = element.birthday ? new Date(element.birthday.year, element.birthday.month, element.birthday.day) : null;
        return new Contact(element.name, birthday, element.image?.uri);
    })

    const contactSelected = (contact) => {
        const contactJson = JSON.stringify(contact);
        return navigation.navigate('Person Overview', {
            selection: {contactJson}
        });
    }

    useLayoutEffect(() => {
        const TabNavigator = navigation.getParent();
        TabNavigator.setOptions({
            headerRight: null,
            headerShown: false,
            tabBarStyle: {
                display: Platform.OS === "android" ? "none" : "flex",
                backgroundColor: Colors.primary500
            }

        })
    });

    const noContacts = contacts.length === 0;
    const contactsSorted = contacts.sort((a, b) => a.name.localeCompare(b.name));
    const ContactsToDisplay = contactsSorted.map( (contact, index) => {
        return(
            <ContactCard
                contact={contact}
                onSelect={contactSelected}
                onLongPress={contactSelected}
                key={index}
            />
        );
    });


    return (
        <View style={styles.screen}>
            {noContacts && <Text style={styles.noContactsText}>No contacts available!</Text>}
            <View style={styles.container}>


                <ScrollView contentContainerStyle={styles.cardsContainer}>
                    {ContactsToDisplay}
                </ScrollView>

                <StatusBar style="auto" />

            </View>
        </View>


    );
}

export default ContactSelectionScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.primary500,
        height: '100%',
        alignItems: "flex-start",
        justifyContent: "flex-start",
    },
    screen: {
        backgroundColor: Colors.primary500,
        height: '100%',
        alignItems: "center",
        justifyContent: "flex-start",
    },
    cardsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width:'100%',
        paddingBottom: 20,
    },
    noContactsText: {
        textAlign: 'center',
        color: Colors.error,
        fontSize: 20,
        fontWeight: 'bold',
        marginTop:300
    }
});
