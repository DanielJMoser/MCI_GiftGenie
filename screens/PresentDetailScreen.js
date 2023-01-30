import React, {useLayoutEffect} from 'react';
import {View, FlatList, StyleSheet, Alert} from 'react-native';
import PresentItem from '../components/PresentItem';
import Colors from '../constants/colors';
import { PresentsContext } from '../store/PresentsContext';
import { PersonsContext } from "../store/PersonsContext";
import { useContext } from 'react';
import {AssignmentContext} from "../store/AssignmentContext";
import {GiftAssignment} from "../models/GiftAssignment";


function PresentDetailScreen(props) {

    const presentKey = props.route.params.presentKey;


    const presentsCtx = useContext(PresentsContext);
    const assignmentsCtx = useContext(AssignmentContext);
    const assignments = assignmentsCtx.assignments;
    const presentsArray = presentsCtx.presents;
    const personsCtx = useContext(PersonsContext);
    const persons = personsCtx.persons;

    const [isEditingMode, setIsEditingMode] = React.useState(false);



    const presentAssignedTo = assignments.filter( (assignment) => {
        return assignment.presentKey === presentKey;
    }).map( (assignment) => {
        return persons.find( (person) => {
            return person._key === assignment._person;
        });
    });


    const DisplayPresent = presentsCtx.presents.filter( (present) => {
        return present._key === presentKey;
    });


    const assignGift = (personKey, presentKey) => {
        const newAssignment = new GiftAssignment(presentKey, personKey, null);
        assignmentsCtx.addAssignment(newAssignment);
    }



    useLayoutEffect(() => {
        const TabNavigator = props.navigation.getParent();
        TabNavigator.setOptions({
            headerRight: null,
        });
    });

    function renderPresent (PresentData, assignments, isEditingMode) {

        if (isEditingMode) {
            return (
                <PresentItem
                    title={PresentData.item.name}
                    imageURL={PresentData.item.image}
                    price={PresentData.item.price}
                    seenAt={PresentData.item.store}
                    link={PresentData.item.link}
                    status={PresentData.item.status}
                    presentKey={PresentData.item._key}
                    LongPress={() => {
                        deletePresent();
                    }}
                />
            );
        }

        else {
        return (



            <PresentItem
                title={PresentData.item.name}
                imageURL={PresentData.item.image}
                                                
                
                price={PresentData.item.price}
                seenAt={PresentData.item.store}
                link={PresentData.item.link}
                status={PresentData.item.status}
                presentKey={PresentData.item._key}
                LongPress={() => {
                    deletePresent();
                }}
            />
        );
    }
    }
    

    const deletePresent = () => {
        Alert.alert(
            'Delete present',
            'Are you sure you want to delete this present?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => {
                        props.navigation.navigate('Presents Overview');
                    }
                }
            ]
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={DisplayPresent}
                keyExtractor={item => item._key}
                renderItem={renderPresent}
            />

                            
        </View>
    );

}

export default PresentDetailScreen;


const styles = StyleSheet.create({


    container: {
        height: '100%',
        width: '100%',
        backgroundColor: Colors.primary500,
        alignItems: 'center',
    },
    image: {
        flex: 1,
        height: 150,
        width: '100%',
        borderRadius: 4,
        padding: 10,
    },
    text: {
        textAlign: 'center',
        color: 'black',
        fontSize: 20
    },
    textContainer: {
        justifyContent: 'center',
        backgroundColor: Colors.accent500,
        height: 40,
        width: '100%',
    }
});