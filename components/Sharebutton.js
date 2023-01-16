import React from 'react';
import { StyleSheet, Text, View, TouchableNativeFeedback } from 'react-native';
import Colors from '../constants/colors';
import { Share } from 'react-native';

const ShareButton = ({ title, price, seenAt, link }) => {
    const onShare = async () => {
        try {
            const result = await Share.share({
                message: `Check out this cool present I found: ${title}, ${price}€, seen at ${seenAt}, ${link}`,
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                } else {
                }
            } else if (result.action === Share.dismissedAction) {
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const content = (
        <View style={styles.button}>
            <Text style={styles.text}>Share your Idea!</Text>
        </View>
    );

    return (
        <TouchableNativeFeedback onPress={onShare}>
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

export default ShareButton;
