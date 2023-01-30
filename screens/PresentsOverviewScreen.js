import React, { useContext, useEffect } from 'react';
import { StyleSheet, View, ScrollView, StatusBar, } from 'react-native';
import PresentCard from '../components/PresentCard';
import Colors from '../constants/colors';
import AddButton from '../components/AddButton';
import { useFocusEffect } from '@react-navigation/native';

import { PresentsContext } from '../store/PresentsContext';
import {deleteConfirmationAlert} from "../components/deleteConfirmationAlert";
import {AssignmentContext} from "../store/AssignmentContext";



const PresentsOverviewScreen = (props) => {

    // Get the presents from the context
    const presentsCtx = useContext(PresentsContext);
    const assignmentsCtx = useContext(AssignmentContext);
    // ... and store them in a local variable
    const presentsArray = presentsCtx.presents;

    useEffect(() => {
        if (props.route.params?.presentKey) {
            props.navigation.navigate("Present Details", {
                presentKey: props.route.params.presentKey,
            });
            props.navigation.setParams({ presentKey: null });
        }
    }, [props.route.params])

    const AddButtonHandler = () => {
        props.navigation.navigate('Add Present');
    }
    useEffect(() => {
        if (props.route.params?.presentKey) {
          props.navigation.navigate("Present Details", {
            presentKey: props.route.params.presentKey,
          });
          props.navigation.setParams({ presentKey: null });
        }
      }, [props.route.params]);
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
    const PresentsSorted = presentsArray.sort((a,b) => a.name.localeCompare(b.name));

    const presentLongPressed = (present) => {
        deleteConfirmationAlert(present, deletePresent, present.name, 'present');
    }

    const deletePresent = (present) => {
        const key = present._key;
        const gift = presentsCtx.presents.find((item) => item._key === key);
        presentsCtx.removePresent(gift);
        const assignmentsToDelete = assignmentsCtx.assignments.filter((element) => {
            return element._gift === key;
        })
        assignmentsToDelete.forEach((element) => {
            assignmentsCtx.removeAssignment(element);
        })
    }

    const DisplayPresent = PresentsSorted.map( (present, index) => {
        return(
            <PresentCard
                present={present}
                onSelect={PresentSelected}
                key={index}
                onLongPress={() => presentLongPressed(present)}
            />

        );
    });

    return(

        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.cardsContainer}>
                { DisplayPresent }
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