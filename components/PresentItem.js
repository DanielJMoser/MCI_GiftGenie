import {View, Text, StyleSheet, Linking, ScrollView} from 'react-native';
import React, { useContext } from 'react';

import Colors from '../constants/colors';
import ShareButton from './Sharebutton';
import WebsiteButton from './WebsiteButton';
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from 'expo-linear-gradient';
import ProgressiveImage from "./ProgressiveImage";
import PresentDropdownMenu from '../components/PresentDropdownMenu';
import { AssignmentContext} from "../store/AssignmentContext";
import { PersonsContext } from "../store/PersonsContext";

const defaultImage = '../assets/present.png';


function PresentItem({title, imageURL, price, seenAt, status, link, presentKey}) {

    const assignmentsCtx = useContext(AssignmentContext);
    const personsCtx = useContext(PersonsContext);
    const assignment = assignmentsCtx.assignments.find((assignment) => {
        return assignment._gift === presentKey;
    });

    let assignedPerson;
    if (assignment) {
        assignedPerson = personsCtx.persons.find((person) => {
            return person._key === assignment._person;
        });
    }

    return (
        <ScrollView>
        <LinearGradient colors={[Colors.primary500, Colors.primary400]}
        end={{x: 1.5, y: 0.2}}
         style={styles.container}>


            
            <View>
                <ProgressiveImage style={styles.image}
                              uri={imageURL}
                              defaultSource={require(defaultImage)}
                              resizeMode={'contain'}     
                />
            </View>
            


            <View style={styles.row}>
                <Ionicons style={styles.icon} 
                name="gift-outline"
                size={20} color="white" 
                />
                <Text style={styles.title}>{title}</Text>
            </View>

            <View style={styles.row}>
                <Ionicons style={styles.icon}
                name="cash-outline"
                size={20} color="white"
                />
                <Text style={styles.title}>{price}€</Text>
            </View>

            <View style={styles.row}>
                <Ionicons style={styles.icon}
                name="location-outline"
                size={20} color="white"
                />
                <Text style={styles.title}>{seenAt}</Text>
            </View>

            <View style={styles.row}>
                <Ionicons style={styles.icon}
                name="person-outline"
                size={20} color="white"
                />
                <PresentDropdownMenu presentID={presentKey} ScreenConfig={styles.screenConfig} TextConfig={styles.textConfig}/>
            </View>

            <View style={styles.row}>
                <Ionicons style={styles.checkmark}
                    name="checkmark-circle"
                    size={20}
                    color={status === 'Bought' ? 'green' : 'red'}
                />
                <Text style={styles.title}>{status}</Text>
            </View>

            <View style={styles.button}>
                <ShareButton
                    title={title}
                    price={price}
                    seenAt={seenAt}
                    link={link}
                />
                <WebsiteButton title="Shop now!" onPress={() => Linking.openURL(link)}/>
            </View>
        </LinearGradient>
        </ScrollView>
        

    );
}


export default PresentItem

const styles = StyleSheet.create({
    container: {
        width: 350,
        height: '95%',
        backgroundColor: Colors.primary500,
        elevation: 10,
        marginTop: 15,
        marginBottom: 30,
        borderColor: 'grey',
        borderWidth: 1.1,
        borderRadius: 10,
    },
    image: {
        marginTop: 20,
        width: 250,
        height: 150,
        marginBottom: 40,
        alignSelf: 'center',
        padding: 10,
        borderRadius: 10,
    },
    icon: {
        alignSelf: 'center',
        marginTop: 20,
    },
    checkmark: {
        alignSelf: 'flex-end',
        marginRight: '2.5%',
        marginTop: '2.5%',
    },

    title: {
        marginLeft: 20,
        marginTop: 20,
        fontSize: 20,
        color: 'white',
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 35,

    },
    row: {
        flexDirection: 'row',
        marginLeft: 50,
    },
    screenConfig: {
        backgroundColor: '#00000000',
        paddingBottom: 0,
    },
    textConfig: {
        color: 'white',
        fontSize: 20
    }
});