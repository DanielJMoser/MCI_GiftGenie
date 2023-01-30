
import React from 'react';
import { TouchableNativeFeedback} from 'react-native';
import Colors from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';


const WebsiteButton = ( props ) => {

    const { onPress, title = "WebsiteRedirect" } = props;

    // This button should redirect to an online shop
    const content = (
        <Ionicons
            name="cart-outline"
            size={30}
            color={Colors.accent500}
        />
    );

  return (
    <TouchableNativeFeedback onPress={onPress}>
            {content}
        </TouchableNativeFeedback>

    
        
    );
};

export default WebsiteButton;
