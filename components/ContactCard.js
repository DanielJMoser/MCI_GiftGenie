import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import ProgressiveImage from "./ProgressiveImage";
import Colors from "../constants/colors";
const defaultImage = '../assets/default-person-image.png';

const ContactCard = (props) => {
    const contact = props.contact;
    return (
        <TouchableOpacity
            style={ {...styles.cardContainer, ...props.style} }
            onPress={() => props.onSelect(contact)}
            onLongPress={() => props.onSelect(contact)}
        >
            <ProgressiveImage style={styles.image}
                              uri={contact.image}
                              defaultSource={require(defaultImage)}
                              resizeMode={'contain'}
            />
            <View style={styles.textContainer}>
                <Text
                    style={styles.contactText}
                >{contact.name}
                </Text>

                {contact.birthday &&
                    <Text style={styles.contactText}>{contact.birthday.toISOString().slice(0, 10)}</Text>
                }

            </View>

        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        height: 60,
        width: '100%',
        backgroundColor: Colors.accent500,
        elevation: 10,
        marginLeft: '5%',
        marginTop: '5%',
        alignItems:'center',
        justifyContent:'flex-start',
        flexDirection:'row',
        margin: 0
    },
    contactText: {
        textAlign: 'center',
        color: 'black',
        fontSize: 20
    },
    image: {
        height: 50,
        width:  60,
        borderRadius: 30,
        margin: 20
    },
    textContainer: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        height: 50,
        backgroundColor: Colors.accent500,
    },
});

export default ContactCard;