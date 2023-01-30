import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import Colors from '../constants/colors';
import React from 'react';
import ProgressiveImage from "./ProgressiveImage";

const defaultImage = '../assets/present.png';

function PresentCard(props) {

    //const presents = PRESENTS.find(present => present._key === props.present._key);

    return (
        <TouchableOpacity
            style={ {...styles.container, ...props.style} }
            onPress={() => props.onSelect(props.present)}
            onLongPress={() => props.onLongPress(props.present)}
        >

            <ProgressiveImage style={styles.image}
                              uri={props.present.image}
                              defaultSource={require(defaultImage)}
                              resizeMode={'contain'}
            />

            <View style={styles.textContainer}>
                <Text
                    numberOfLines={2}
                    adjustsFontSizeToFit
                    style={styles.text}
                >{props.present.name}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 180,
        width: '42.5%',
        backgroundColor: Colors.primary500,
        elevation: 10,
        marginLeft: '5%',
        marginTop: '5%',
        borderRadius: 10,
        overflow: 'hidden',  
         

    },
    text: {
        textAlign: 'center',
        marginTop: '2.5%',
        color: 'eggshell',
        fontSize: 20
    },
    image: {
        height: 140,
        width: '100%',

    },
    textContainer: {
        height: 40,
        width: '100%',
        backgroundColor: Colors.accent500,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    }
});

export default PresentCard;