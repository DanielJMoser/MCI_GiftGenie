import React from 'react';
import { TouchableNativeFeedback } from 'react-native';
import Colors from '../constants/colors';
import { Share } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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
        <Ionicons
            name="share-social-outline"
            size={30}
            color={Colors.accent500}
        />
    );

    return (
        <TouchableNativeFeedback onPress={onShare}>
            {content}
        </TouchableNativeFeedback>
    );
};

export default ShareButton;
