import React from 'react';
import { View, FlatList, StyleSheet, Image, TouchableOpacity, Alert, Text } from 'react-native';
import PresentItem from '../components/PresentItem';
import WebsiteButton from '../components/WebsiteButton';
import Colors from '../constants/colors';
import { PRESENTS } from '../data/PresentData';
import { GIFTASSIGNMENTS } from '../data/GiftAssignmentData';



function PresentDetailScreen(props) {

    const presentKey = props.route.params.presentKey;
    const assignmentKey = props.route.params.assignmentKey;
    

    const DisplayPresent = PRESENTS.filter( (present) => {
        return present._key === presentKey;
    });

    const presentAssignedTo = GIFTASSIGNMENTS.forEach( (assignment) => {
        if (assignment._gift._key === presentKey) {
            return assignment._person._key;
        }
    });

    const assignGift = (personKey, presentKey) => {
        const newAssignment = new GIFTASSIGNMENTS(personKey, presentKey);
        GIFTASSIGNMENTS.push(newAssignment);
    }

    


    function renderPresent (PresentData, presentAssignedTo, assignGift) {

        return (

            <PresentItem
                title={PresentData.item.name}
                imageURL={PresentData.item.image}
                                                
                price={PresentData.item.price}
                seenAt={PresentData.item.store}
                link={PresentData.item.link}

                presentAssigned= {presentAssignedTo}

                onSelect={() => {
                    props.navigation.navigate('PresentItem', {presentKey: PresentData.item._key, presentAssignedTo: presentAssignedTo});
                }}
                LongPress={() => {
                    deletePresent();
                }}
            />
        );
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

