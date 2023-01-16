import React, { useContext } from 'react';
import { StyleSheet, Text, View, ScrollView, StatusBar, } from 'react-native';
import PresentCard from '../components/PresentCard';
import { PRESENTS } from '../data/PresentData';
import Colors from '../constants/colors';
import AddButton from '../components/AddButton';
import { useFocusEffect } from '@react-navigation/native';

import { PresentsContext } from '../store/PresentsContext';



const PresentsOverviewScreen = (props) => {

    // Get the presents from the context
    const presentsCtx = useContext(PresentsContext);
    // ... and store them in a local variable
    const presentsArray = presentsCtx.presents;
    const AddButtonHandler = () => {
        props.navigation.navigate('Add Present');
    }

    // This function is called when a present is selected
    function PresentSelected(present) {
        props.navigation.navigate('Present Details', { presentKey: present._key, present: present });
    }

    // Add the AddButton to the header
    useFocusEffect(
        React.useCallback(() => {
            const tabNavigator = props.navigation.getParent();
            tabNavigator.setOptions({
                headerRight: () => <AddButton onPress={AddButtonHandler} />,
                headerShown: true,
            });
        }, [AddButtonHandler, props.navigation])
    );


    // Sort the presents by name
    const PresentsSorted = PRESENTS.sort((a,b) => a.name.localeCompare(b.name));

    
    const DisplayPresent = PresentsSorted.map( (present, index) => {
        return(
            <PresentCard
                present={present}
                onSelect={PresentSelected}
                key={index}
                onLongPress={() => alert("Deleting is not implemented yet.")}
            />
        );
    });


    return(

        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.cardsContainer}>
                {DisplayPresent}
            </ScrollView>

            <StatusBar style="auto" />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary500,
        alignItem: 'center',
        justifyContent: 'center',
    },
    cardsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
});

export default PresentsOverviewScreen;