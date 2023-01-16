
import React from 'react';
import { StyleSheet, Text, View, TouchableNativeFeedback} from 'react-native';
import Colors from '../constants/colors';


const WebsiteButton = ( props ) => {

    const { onPress, title = "WebsiteRedirect" } = props;

    const content = (
        <View style={styles.button}>
            <Text style={styles.text}>{title}</Text>
        </View>
    );

  return (
    <TouchableNativeFeedback onPress={onPress}>
            {content}
        </TouchableNativeFeedback>

    
        
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.accent500,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
        length: 200,
        width: 250,
        marginTop: 10,
        
    },
    text: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
    },
});




export default WebsiteButton;
