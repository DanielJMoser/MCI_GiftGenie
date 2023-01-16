import {View, Text, Button, StyleSheet, Image, Linking} from 'react-native';
import React from 'react';

import Colors from '../constants/colors';
import ShareButton from './Sharebutton';
import WebsiteButton from './WebsiteButton';
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from 'expo-linear-gradient';
import PickerPresents from './DropdownMenuPresentAssignment';


function PresentItem({title, imageURL, price, seenAt, status, link}) {

    return (
        
            <LinearGradient colors={[Colors.primary500, Colors.primary400]}
            end={{x: 1.5, y: 0.2}}
             style={styles.container}>

                <Image style={styles.image} source={{uri: imageURL}}/>

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
                    <Text style={styles.title}></Text>
                </View>

                <View>
                    <PickerPresents/>
                </View>

                <View style={styles.button}>
                    <WebsiteButton title="Shop now!" onPress={() => Linking.openURL(link)}/>
                    <ShareButton
                        title={title}
                        price={price}
                        seenAt={seenAt}
                        link={link}

                    />
                </View>
            </LinearGradient>
    );
}


export default PresentItem

const styles = StyleSheet.create({
    container: {
        width: 350,
        height: 580,
        backgroundColor: Colors.primary500,
        elevation: 10,
        marginTop: '10%',
        marginBottom: '10%',

        borderColor: 'grey',
        borderWidth: 1.1,
        borderRadius: 10,

    },
    image: {
        marginTop: 20,
        width: 250,
        height: 150,
        marginBottom: 20,
        marginTop: 40,
        alignSelf: 'center',
        padding: 10,
        borderRadius: 10,
    },
    icon: {
        alignSelf: 'center',
        marginTop: 20,
    },

    title: {
        marginLeft: 20,
        marginTop: 20,
        fontSize: 20,
        color: 'white',
    },
    button: {
        marginTop: 35,
        alignSelf: 'center',
    },
    row: {
        flexDirection: 'row',
        marginLeft: 50,
    },
    
});
